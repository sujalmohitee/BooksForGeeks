import { BrowserRouter, Routes, Route } from "react-router-dom";

import BookSearch from "./components/BookSearch";
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import MyLibrary from "./pages/MyLibrary";
import Favorites from "./pages/Favorites";
import BookDetails from "./pages/BookDetails";
import PDFReader from "./pages/PDFReader";
import AudiobookPlayer from "./pages/AudiobookPlayer";
import AdminDashboard from "./pages/AdminDashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Books from "./pages/Books";

import Hero from "./components/Hero";
import BenefitsBar from "./components/BenefitsBar";
import FeaturedBooks from "./components/FeaturedBooks";
import Categories from "./components/Categories";

import { AuthProvider } from "./context/AuthContext";

import "./App.css";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <Navbar />

        <main className="page-content">

          <Routes>

            {/* HOME */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <BenefitsBar />
                  <BookSearch />
                  <FeaturedBooks />
                  <Categories />
                </>
              }
            />

            {/* BOOK COLLECTION */}
            <Route
              path="/books"
              element={<Books />}
            />

            {/* SINGLE BOOK DETAILS */}
            <Route
              path="/book/:id"
              element={
                <ProtectedRoute>
                  <BookDetails />
                </ProtectedRoute>
              }
            />

            {/* MY LIBRARY */}
            <Route
              path="/library"
              element={
                <ProtectedRoute>
                  <MyLibrary />
                </ProtectedRoute>
              }
            />

            {/* FAVORITES */}
            <Route
              path="/favorites"
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />

            {/* PDF READER */}
            <Route
              path="/reader/:id"
              element={
                <ProtectedRoute>
                  <PDFReader />
                </ProtectedRoute>
              }
            />

            {/* AUDIOBOOK PLAYER */}
            <Route
              path="/player/:id"
              element={
                <ProtectedRoute>
                  <AudiobookPlayer />
                </ProtectedRoute>
              }
            />

            {/* ADMIN */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />

            {/* AUTH */}
            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

          </Routes>

        </main>

      </div>
    </BrowserRouter>
  );
}

function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithAuth;