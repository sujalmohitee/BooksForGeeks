const Book = require("../models/Book");

const createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// GET ALL BOOKS
const getAllBooks = async (req, res) => {
  try {
    const User = require("../models/User");

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const books = await Book.find({
      _id: { $in: user.library }
    });

    const favoriteIds = user.favorites.map(
      (id) => id.toString()
    );

    const booksWithDetails = books.map((book) => {
      const bookId = book._id.toString();

      const reading = user.readingProgress.find(
        (item) => item.book.toString() === bookId
      );

      const audio = user.audioProgress.find(
        (item) => item.book.toString() === bookId
      );

      return {
        ...book.toObject(),

        isFavorite: favoriteIds.includes(bookId),

        readingProgress: reading ? reading.progress : 0,
    currentPage: reading ? reading.currentPage : 1,

        audioProgress: audio
          ? audio.currentTime
          : 0
      };
    });

    res.status(200).json({
      success: true,
      count: booksWithDetails.length,
      books: booksWithDetails
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// GET SINGLE BOOK
const getBookById = async (req, res) => {
  try {
    const User = require("../models/User");

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    const user = await User.findById(req.user.id);

    const isFavorite =
      user?.favorites.some(
        (id) => id.toString() === book._id.toString()
      ) || false;

    res.status(200).json({
      success: true,
      book: {
        ...book.toObject(),
        isFavorite
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE BOOK
const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            book
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const toggleFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const bookId = req.params.id;

    const User = require("../models/User");

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found"
      });
    }

    const favoriteIndex = user.favorites.findIndex(
      (id) => id.toString() === bookId
    );

    if (favoriteIndex === -1) {
      // Add favorite
      user.favorites.push(bookId);

      await user.save();

      return res.status(200).json({
        success: true,
        message: "Book added to favorites",
        isFavorite: true
      });
    }

    // Remove favorite
    user.favorites.splice(favoriteIndex, 1);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Book removed from favorites",
      isFavorite: false
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const removeFromLibrary = async (req, res) => {
  try {
    const User = require("../models/User");

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const bookId = req.params.id;

    const bookIndex = user.library.findIndex(
      (id) => id.toString() === bookId
    );

    if (bookIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Book is not in your library"
      });
    }

    user.library.splice(bookIndex, 1);

    // Also remove from favorites
    user.favorites = user.favorites.filter(
      (id) => id.toString() !== bookId
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Book removed from library"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getAllBooksForAdmin = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: books.length,
      books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
    toggleFavorite,
    removeFromLibrary,
    getAllBooksForAdmin
};