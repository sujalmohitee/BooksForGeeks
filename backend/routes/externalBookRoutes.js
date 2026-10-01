const express = require("express");

const {
  searchExternalBooks,
  saveExternalBook
} = require("../controllers/externalBookController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Public search
router.get("/search", searchExternalBooks);

// Login required to save
router.post("/save", protect, saveExternalBook);

module.exports = router;