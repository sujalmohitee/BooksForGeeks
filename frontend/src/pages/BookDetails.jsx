import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  getBookById,
  toggleBookFavorite
} from "../services/bookApi";

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBookById(id);

        setBook(data.book);
      } catch (error) {
        console.error("Failed to fetch book:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleFavorite = async () => {
    try {
      const data = await toggleBookFavorite(id);

      setBook((currentBook) => ({
        ...currentBook,
        isFavorite: data.isFavorite
      }));
    } catch (error) {
      console.error("Failed to update favorite:", error);
    }
  };

  if (loading) {
  return (
    <main className="book-details-page">
      <div className="book-details-container">
        <p>Loading book...</p>
      </div>
    </main>
  );
}

if (!book) {
  return (
    <main className="book-details-page">
      <div className="book-details-container">
        <p>Book not found.</p>
      </div>
    </main>
  );
}

return (
  <main className="book-details-page">
    <div className="book-details-container">

      <Link to="/library" className="back-to-library">
        ← Back to My Library
      </Link>

      <div className="book-details-content">

        <div className="book-details-cover">
          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt={book.title}
            />
          ) : (
            <span>📖</span>
          )}
        </div>

        <div className="book-details-info">

          <p className="section-label">
            BOOK DETAILS
          </p>

          <h1>{book.title}</h1>

          <h3>
            By {book.author || "Unknown Author"}
          </h3>

          {book.category && (
            <p>
              <strong>Category:</strong> {book.category}
            </p>
          )}

          {book.publishedYear && (
            <p>
              <strong>Published:</strong> {book.publishedYear}
            </p>
          )}

          <p className="book-details-description">
            {book.description || "No description available."}
          </p>

          <div className="book-details-actions">

            <button
              className="favorite-button"
              onClick={handleFavorite}
            >
              {book.isFavorite
                ? "❤️ Remove Favorite"
                : "♡ Add to Favorites"}
            </button>

            {book.pdfUrl && (
              <Link to={`/reader/${book._id}`}>
                <button>📖 Read PDF</button>
              </Link>
            )}

            {book.audiobookUrl && (
              <Link to={`/player/${book._id}`}>
                <button>🎧 Listen</button>
              </Link>
            )}

          </div>

        </div>

      </div>

    </div>
  </main>
);
}

export default BookDetails;