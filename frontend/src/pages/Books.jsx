import { useSearchParams } from "react-router-dom";
import BookSearch from "../components/BookSearch";

function Books() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("search");

  const categories = [
    "Programming",
    "Web Development",
    "Artificial Intelligence",
    "Database",
    "Cyber Security",
    "Computer Science"
  ];

  const handleCategory = (selectedCategory) => {
    setSearchParams({
      search: selectedCategory.toLowerCase()
    });
  };

  return (
    <main className="books-page">

      <section className="books-page-header">
        <p className="section-label">BOOK COLLECTION</p>

        <h1>Explore Our Library</h1>

        <p>
          Discover books, explore new topics, and find your next read.
        </p>

        {category && (
          <div className="active-category">
            Exploring: {category}
          </div>
        )}
      </section>

      <section className="books-categories">
        <h2>Browse Categories</h2>

        <div className="category-filters">
          <button
            className={!category ? "active" : ""}
            onClick={() => setSearchParams({})}
          >
            All Books
          </button>

          {categories.map((item) => (
            <button
              key={item}
              className={
                category === item.toLowerCase() ? "active" : ""
              }
              onClick={() => handleCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <BookSearch />

    </main>
  );
}

export default Books;