const express = require("express");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  toggleFavorite,
  removeFromLibrary,
  getAllBooksForAdmin
} = require("../controllers/bookController");

const router = express.Router();

router.post("/", protect, admin, createBook);

router.get("/", protect, getAllBooks);

router.get("/:id", protect, getBookById);

router.put("/:id", protect, admin, updateBook);

router.delete("/:id", protect, admin, deleteBook);

router.patch("/:id/favorite", protect, toggleFavorite);

router.delete("/:id/library", protect, removeFromLibrary);

router.get("/admin/all", protect, admin, getAllBooksForAdmin);

module.exports = router;