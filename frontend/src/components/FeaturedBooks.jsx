import { useEffect, useState } from "react";
import { searchBooks } from "../services/bookApi";

function FeaturedBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadFeaturedBooks = async () => {
      try {
        const data = await searchBooks("programming");

        setBooks((data.books || []).slice(0, 6));
      } catch (error) {
        console.error("Failed to load featured books:", error);
      }
    };

    loadFeaturedBooks();
  }, []);

  return (
    <section className="featured-books">
      <div className="featured-header">
        <div>
          <p className="section-label">FEATURED COLLECTION</p>

          <h2>Books Worth Exploring</h2>

          <p>
            A few interesting reads to get you started.
          </p>
        </div>

        <button className="explore-btn">
          Explore More
        </button>
      </div>

      <div className="featured-grid">
        {books.map((book) => (
          <article className="featured-card" key={book.externalId}>
            <div className="featured-cover">
              {book.coverImage ? (
                <img
                  src={book.coverImage}
                  alt={book.title}
                />
              ) : (
                <div className="no-cover">
                  No Cover
                </div>
              )}
            </div>

            <div className="featured-info">
              <h3>{book.title}</h3>

              <p>
                {book.author || "Unknown Author"}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeaturedBooks;