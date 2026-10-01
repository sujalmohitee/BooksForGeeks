import { useEffect, useState } from "react";

import {
  getAllBooksForAdmin,
  createBook,
  updateBook,
  deleteBook,
  uploadFile
} from "../services/bookApi";
import "./AdminDashboard.css";

const emptyForm = {
  title: "",
  author: "",
  description: "",
  coverImage: "",
  category: "",
  pdfUrl: "",
  audiobookUrl: ""
};

function AdminDashboard() {
  const [formData, setFormData] = useState(emptyForm);
  const [books, setBooks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  const fetchBooks = async () => {
    try {
      const data = await getAllBooksForAdmin();
      setBooks(data.books || []);
    } catch (error) {
      console.error("Failed to fetch books:", error);
      setMessage("Failed to load books.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateBook(editingId, formData);
        setMessage("Book updated successfully!");
      } else {
        await createBook(formData);
        setMessage("Book added successfully!");
      }

      setFormData(emptyForm);
      setEditingId(null);
      await fetchBooks();
    } catch (error) {
      console.error("Failed to save book:", error);
      setMessage(
        error.response?.data?.message || "Failed to save book."
      );
    }
  };

  const handleEdit = (book) => {
    setEditingId(book._id);

    setFormData({
      title: book.title || "",
      author: book.author || "",
      description: book.description || "",
      coverImage: book.coverImage || "",
      category: book.category || "",
      pdfUrl: book.pdfUrl || "",
      audiobookUrl: book.audiobookUrl || ""
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmed) return;

    try {
      await deleteBook(id);
      setBooks((currentBooks) =>
        currentBooks.filter((book) => book._id !== id)
      );
      setMessage("Book deleted successfully!");

      if (editingId === id) {
        setEditingId(null);
        setFormData(emptyForm);
      }
    } catch (error) {
      console.error("Failed to delete book:", error);
      setMessage(
        error.response?.data?.message || "Failed to delete book."
      );
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setMessage("");
  };

  const handleFileUpload = async (file, fieldName) => {
  if (!file) return;

  try {
    const result = await uploadFile(file);

    setFormData((prev) => ({
      ...prev,
      [fieldName]: result.fileUrl
    }));

    alert("File uploaded successfully!");
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.message || "File upload failed");
  }
};

  return (
  <main className="admin-page">
    <div className="admin-container">

      <div className="admin-header">
        <p className="section-label">ADMIN PANEL</p>
        <h1>Admin Dashboard</h1>
        <p>Manage books, PDFs, and audiobooks from one place.</p>
      </div>

      <div className="admin-stats">

        <div className="admin-stat-card">
          <span>📚</span>
          <div>
            <p>Total Books</p>
            <h2>{books.length}</h2>
          </div>
        </div>

        <div className="admin-stat-card">
          <span>📖</span>
          <div>
            <p>PDF Books</p>
            <h2>
              {books.filter((book) => book.pdfUrl).length}
            </h2>
          </div>
        </div>

        <div className="admin-stat-card">
          <span>🎧</span>
          <div>
            <p>Audiobooks</p>
            <h2>
              {books.filter((book) => book.audiobookUrl).length}
            </h2>
          </div>
        </div>

      </div>

      <div className="admin-form-card">
        <h2>{editingId ? "Edit Book" : "Add a New Book"}</h2>

        <form className="admin-form" onSubmit={handleSubmit}>

          <input
            name="title"
            placeholder="Book Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Book Description"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            name="coverImage"
            placeholder="Cover Image URL"
            value={formData.coverImage}
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />

          <input
            name="pdfUrl"
            placeholder="PDF URL"
            value={formData.pdfUrl}
            onChange={handleChange}
          />

          <input
            name="audiobookUrl"
            placeholder="Audiobook URL"
            value={formData.audiobookUrl}
            onChange={handleChange}
          />

          <div className="admin-upload">
            <label>Upload PDF</label>

            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={(e) =>
                handleFileUpload(
                  e.target.files[0],
                  "pdfUrl"
                )
              }
            />
          </div>

          <div className="admin-upload">
            <label>Upload Audiobook</label>

            <input
              type="file"
              accept=".mp3,.wav,audio/*"
              onChange={(e) =>
                handleFileUpload(
                  e.target.files[0],
                  "audiobookUrl"
                )
              }
            />
          </div>

          <div className="admin-buttons">

            <button type="submit">
              {editingId ? "Update Book" : "Add Book"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-button"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}

          </div>

        </form>
      </div>

      {message && (
        <p className="admin-message">
          {message}
        </p>
      )}

      <div className="admin-books-header">
        <h2>Manage Books ({books.length})</h2>
        <p>View, edit, or remove books from the platform.</p>
      </div>

      {books.length === 0 ? (
        <div className="admin-form-card">
          <p>No books found.</p>
        </div>
      ) : (
        <div className="admin-books-grid">

          {books.map((book) => (
            <article
              className="admin-book-card"
              key={book._id}
            >

              <div className="admin-book-cover">

                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                  />
                ) : (
                  <span>📖</span>
                )}

              </div>

              <h3>{book.title}</h3>

              <p className="admin-book-author">
                By {book.author || "Unknown Author"}
              </p>

              <p className="admin-book-category">
                {book.category || "Uncategorized"}
              </p>

              <div className="admin-book-status">

                <p>
                  PDF:{" "}
                  {book.pdfUrl
                    ? "Available"
                    : "Not available"}
                </p>

                <p>
                  Audiobook:{" "}
                  {book.audiobookUrl
                    ? "Available"
                    : "Not available"}
                </p>

              </div>

              <div className="admin-book-actions">

                <button
                  onClick={() => handleEdit(book)}
                >
                  Edit
                </button>

                <button
                  className="delete-button"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </button>

              </div>

            </article>
          ))}

        </div>
      )}

    </div>
  </main>
);
}

export default AdminDashboard;