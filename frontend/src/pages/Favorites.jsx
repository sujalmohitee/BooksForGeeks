import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSavedBooks } from "../services/bookApi";
import "./Favorites.css";

function Favorites() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getSavedBooks();

        const favoriteBooks = (data.books || []).filter(
          (book) => book.isFavorite
        );

        setBooks(favoriteBooks);
      } catch (error) {
        console.error(
          "Failed to fetch favorites:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <p>Loading favorites...</p>;
  }

  return (
  <main className="favorites-page">
    <div className="favorites-container">

      <div className="favorites-header">
        <p className="section-label">YOUR FAVORITES</p>
        <h1>My Favorites ❤️</h1>
        <p>
          Keep your favorite books in one place and easily return to them.
        </p>
      </div>

      {books.length === 0 ? (
        <div className="empty-favorites">
          <span>♡</span>
          <h2>No Favorites Yet</h2>
          <p>
            Add books to your favorites and they will appear here.
          </p>
        </div>
      ) : (
        <div className="favorites-grid">
          {books.map((book) => (
            <article className="favorite-card" key={book._id}>

              <div className="favorite-cover">
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={book.title}
                  />
                ) : (
                  <span>📖</span>
                )}
              </div>

              <Link
                to={`/book/${book._id}`}
                className="favorite-title"
              >
                <h2>{book.title}</h2>
              </Link>

              <p className="favorite-author">
                {book.author || "Unknown Author"}
              </p>

              <p className="favorite-label">
                ❤️ Favorite
              </p>

            </article>
          ))}
        </div>
      )}

    </div>
  </main>
);
}

export default Favorites;