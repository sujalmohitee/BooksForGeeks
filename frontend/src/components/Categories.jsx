import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();

  const categories = [
    {
      icon: "💻",
      name: "Programming",
      description: "Code, languages & development",
      query: "programming"
    },
    {
      icon: "🌐",
      name: "Web Development",
      description: "Frontend, backend & full stack",
      query: "web development"
    },
    {
      icon: "🤖",
      name: "AI & Machine Learning",
      description: "AI, ML & intelligent systems",
      query: "artificial intelligence"
    },
    {
      icon: "🗄️",
      name: "Databases",
      description: "SQL, NoSQL & data systems",
      query: "database"
    },
    {
      icon: "🔐",
      name: "Cyber Security",
      description: "Security, networks & privacy",
      query: "cyber security"
    },
    {
      icon: "🧠",
      name: "Computer Science",
      description: "Algorithms, theory & concepts",
      query: "computer science"
    }
  ];

  const handleCategory = (query) => {
    navigate(`/books?search=${encodeURIComponent(query)}`);
  };

  return (
    <section className="categories-section" id="categories">
      <div className="categories-header">
        <p className="section-label">EXPLORE BY TOPIC</p>

        <h2>Find Your Area of Interest</h2>

        <p>
          Explore books based on the topics you love learning about.
        </p>
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <button
            className="category-card"
            key={category.name}
            onClick={() => handleCategory(category.query)}
          >
            <span className="category-icon">
              {category.icon}
            </span>

            <div>
              <h3>{category.name}</h3>

              <p>{category.description}</p>
            </div>

            <span className="category-arrow">→</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;