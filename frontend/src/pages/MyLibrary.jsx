import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getSavedBooks,
  toggleBookFavorite,
  removeBookFromLibrary
} from "../services/bookApi";
import "./MyLibrary.css";

function MyLibrary() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}m ${remainingSeconds}s`;
  };

  const fetchBooks = async () => {
    try {
      setLoading(true);

      const data = await getSavedBooks();

      setBooks(data.books || []);
    } catch (error) {
      console.error("Failed to load library:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleFavorite = async (id) => {
    try {
      const data = await toggleBookFavorite(id);

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === id
            ? {
                ...book,
                isFavorite: data.isFavorite
              }
            : book
        )
      );
    } catch (error) {
      console.error("Favorite update failed:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeBookFromLibrary(id);

      setBooks((prevBooks) =>
        prevBooks.filter((book) => book._id !== id)
      );
    } catch (error) {
      console.error("Remove from library failed:", error);
    }
  };

  if (loading) {
    return <p>Loading your library...</p>;
  }

  return (
  <main className="my-library-page">
    <div className="library-container">

      <div className="library-header">
        <p className="section-label">YOUR COLLECTION</p>
        <h1>My Library</h1>
        <p>
          Keep track of the books you want to read, listen to, and explore.
        </p>
      </div>

      {books.length === 0 ? (
        <div className="empty-library">
          <span>📚</span>
          <h2>Your library is empty</h2>
          <p>Search for books and save your favorites here.</p>
        </div>
      ) : (
        <div className="library-grid">
          {books.map((book) => (
            <article className="library-card" key={book._id}>

              <div className="library-cover">
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                  />
                ) : (
                  <span>📖</span>
                )}
              </div>

              <h2>{book.title}</h2>

              <p className="library-author">
                {book.author || "Unknown Author"}
              </p>

              {book.category && (
                <p className="library-category">
                  {book.category}
                </p>
              )}

              {book.description && (
                <p className="library-description">
                  {book.description}
                </p>
              )}

              <div className="library-actions">

                <Link to={`/book/${book._id}`}>
                  View Details
                </Link>

                <button
                  className="favorite"
                  onClick={() => handleFavorite(book._id)}
                >
                  {book.isFavorite
                    ? "❤️ Favorite"
                    : "♡ Favorite"}
                </button>

                {book.pdfUrl && (
                  <Link to={`/reader/${book._id}`}>
                    📖 Read
                  </Link>
                )}

                {book.audiobookUrl && (
                  <Link to={`/player/${book._id}`}>
                    🎧 Listen
                  </Link>
                )}

                <button
                  className="remove"
                  onClick={() => handleRemove(book._id)}
                >
                  Remove
                </button>

              </div>

              {book.pdfUrl && (
                <div className="progress-section">
                  <p>
                    📖 Reading Progress:{" "}
                    {book.readingProgress || 0}%
                  </p>

                  <progress
                    value={book.readingProgress || 0}
                    max="100"
                  />
                </div>
              )}

              {book.audiobookUrl && (
                <div className="progress-section">
                  <p>
                    🎧 Listening Position:{" "}
                    {formatTime(book.audioProgress || 0)}
                  </p>
                </div>
              )}

            </article>
          ))}
        </div>
      )}

    </div>
  </main>
);
}

export default MyLibrary;