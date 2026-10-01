import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

function Profile() {
  const { user, logout } = useAuth();

  return (
    <main className="profile-page">
      <div className="profile-container">

        <div className="profile-header">
          <p className="section-label">YOUR ACCOUNT</p>
          <h1>My Profile</h1>
          <p>Manage your BooksForGeeks account.</p>
        </div>

        <div className="profile-card">

          <div className="profile-avatar">
            👤
          </div>

          <div className="profile-info">
            <h2>{user?.name || "User"}</h2>

            <p>
              <strong>Email:</strong>{" "}
              {user?.email || "Not available"}
            </p>

            {user?.role && (
              <p>
                <strong>Role:</strong>{" "}
                {user.role}
              </p>
            )}
          </div>

          <div className="profile-actions">
            <Link to="/library">
              📚 My Library
            </Link>

            <Link to="/favorites">
              ❤️ My Favorites
            </Link>

            <button onClick={logout}>
              🚪 Logout
            </button>
          </div>

        </div>

      </div>
    </main>
  );
}

export default Profile;