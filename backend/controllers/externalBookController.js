const axios = require("axios");
const Book = require("../models/Book");
const User = require("../models/User");

// Search books from Open Library + Admin-added books
const searchExternalBooks = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query is required"
      });
    }

    // Search books added by Admin in MongoDB
    const localBooks = await Book.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { author: { $regex: q, $options: "i" } }
      ]
    });

    // Search Open Library
    const response = await axios.get(
      "https://openlibrary.org/search.json",
      {
        params: {
          q,
          limit: 10
        }
      }
    );

    // Convert Open Library results
    const externalBooks = response.data.docs.map((book) => ({
      title: book.title || "Unknown Title",

      author:
        book.author_name?.[0] || "Unknown Author",

      publishedYear:
        book.first_publish_year || null,

      coverImage: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        : "",

      externalId:
        book.key || null,

      source: "external"
    }));

    // Convert Admin books
    const adminBooks = localBooks.map((book) => ({
      _id: book._id,

      title: book.title,

      author: book.author,

      description: book.description,

      coverImage: book.coverImage,

      category: book.category,

      pdfUrl: book.pdfUrl,

      audiobookUrl: book.audiobookUrl,

      externalId: book.externalId,

      source: "admin"
    }));

    // Combine Admin + Open Library books
    const books = [
      ...adminBooks,
      ...externalBooks
    ];

    res.status(200).json({
      success: true,
      count: books.length,
      books
    });

  } catch (error) {
    console.error("External book search error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// Save an external book to user's library
const saveExternalBook = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const {
      _id,
      title,
      author,
      description,
      coverImage,
      externalId,
      source
    } = req.body;

    let book;

    // If this is an Admin-added book,
    // use the existing MongoDB book
    if (source === "admin" && _id) {
      book = await Book.findById(_id);

      if (!book) {
        return res.status(404).json({
          success: false,
          message: "Admin book not found"
        });
      }
    } else {
      // External Open Library book
      book = await Book.findOne({ externalId });

      if (!book) {
        book = await Book.create({
          title,
          author,
          description: description || "",
          coverImage: coverImage || "",
          category: "Other",
          source: "external",
          externalId: externalId || null
        });
      }
    }

    // Check if already in user's library
    const alreadySaved = user.library.some(
      (bookId) =>
        bookId.toString() === book._id.toString()
    );

    if (alreadySaved) {
      return res.status(409).json({
        success: false,
        message: "Book is already in your library"
      });
    }

    // Add book to library
    user.library.push(book._id);

    await user.save();

    res.status(201).json({
      success: true,
      message: "Book saved to library",
      book
    });

  } catch (error) {
    console.error("Save book error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  searchExternalBooks,
  saveExternalBook
};