import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="site-header">
      {/* Top announcement bar */}
      <div className="announcement-bar">
        <span>📚 Free stories for every reader</span>
        <span>✦ Books that inspire, stories that stay.</span>
        <span>Customer Support</span>
      </div>

      {/* Main navigation */}
      <nav className="main-navbar">
        <Link to="/" className="brand">
          <span className="brand-icon">▤</span>
          <span>
            <strong>BOOKSFORGEEKS</strong>
            <small>BOOKSHOP</small>
          </span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/books" className="nav-link">BOOKS</Link>

          {user && (
            <>
              <Link to="/library" className="nav-link">MY LIBRARY</Link>
              <Link to="/favorites" className="nav-link">FAVORITES</Link>
              <Link to="/profile" className="nav-link">PROFILE</Link>
            </>
          )}

          {user?.role === "admin" && (
            <Link to="/admin" className="nav-link">ADMIN</Link>
          )}
        </div>

        <div className="nav-actions">
          {user ? (
            <>
              <span className="welcome-text">Hi, {user.name}</span>

              <button className="nav-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-icon" title="Login">
                ♙
              </Link>

              <Link to="/register" className="nav-button">
                Sign In
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;