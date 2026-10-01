import { useState, useEffect } from "react";
import { searchBooks, saveBook } from "../services/bookApi";
import { useSearchParams } from "react-router-dom";

function BookSearch() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const category = searchParams.get("search");

  if (category) {
    setQuery(category);

    const fetchCategoryBooks = async () => {
      try {
        setLoading(true);

        const data = await searchBooks(category);

        setBooks(data.books || []);
      } catch (error) {
        console.error("Category search failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryBooks();
  }
}, [searchParams]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);

      const data = await searchBooks(query);

      setBooks(data.books || []);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (book) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to save books to your library.");
      return;
    }

    try {
      const data = await saveBook(book);

      alert(data.message);
    } catch (error) {
      if (error.response?.status === 409) {
        alert("Book is already in your library.");
      } else {
        console.error("Save failed:", error);
        alert("Failed to save book.");
      }
    }
  };

  return (
    <section className="book-search" id="books">
      <div className="book-search-header">
        <p className="section-label">BOOK DISCOVERY</p>

        <h2>Find Your Next Read</h2>

        <p className="section-description">
          Search through thousands of books and discover something worth reading.
        </p>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by title, author, or topic..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading && (
        <p className="search-status">
          Searching for books...
        </p>
      )}

      {!loading && books.length > 0 && (
        <div className="book-grid">
          {books.map((book) => (
            <article className="book-card" key={book.externalId}>
              <div className="book-cover">
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

              <div className="book-info">
                <h3>{book.title}</h3>

                <p className="book-author">
                  {book.author || "Unknown Author"}
                </p>

                {book.publishedYear && (
                  <p className="book-year">
                    {book.publishedYear}
                  </p>
                )}

                <button
                  className="save-book-btn"
                  onClick={() => handleSave(book)}
                >
                  ♡ Save to Library
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {!loading && books.length === 0 && (
        <div className="empty-search">
          <span>📚</span>
          <p>Search for a book to begin exploring.</p>
        </div>
      )}
    </section>
  );
}

export default BookSearch;