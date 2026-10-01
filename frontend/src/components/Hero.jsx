import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <p className="hero-eyebrow">A WORLD OF STORIES, JUST FOR YOU</p>

        <h1>
          Find your next
          <br />
          favorite read.
        </h1>

        <p className="hero-description">
          Explore books, enjoy audiobooks, and build
          <br />
          your own library — all in one place.
        </p>

        <div className="hero-buttons">
          <a href="#books" className="hero-button primary">
            EXPLORE BOOKS <span>→</span>
          </a>

          <Link to="/library" className="hero-button secondary">
            MY LIBRARY
          </Link>
        </div>

        <div className="hero-rating">
          <span className="rating-stars">✦ ✦ ✦</span>
          <span>A little something for every curious mind</span>
        </div>
      </div>

      <div className="hero-art">
        <div className="hero-decor hero-decor-one">✦</div>
        <div className="hero-decor hero-decor-two">✧</div>

        <div className="hero-book hero-book-back">
          <span>THE ART OF</span>
          <strong>Thinking</strong>
          <small>DEEPER</small>
        </div>

        <div className="hero-book hero-book-front">
          <span>BOOKSFORGEEKS COLLECTION</span>
          <strong>Stories<br />Beyond<br />Pages</strong>
          <small>READ • LISTEN • DISCOVER</small>
        </div>

        <div className="hero-free-badge">
          <strong>100%</strong>
          <span>FREE</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;