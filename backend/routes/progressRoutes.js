const express = require("express");

const {
  updateReadingProgress,
  getReadingProgress
} = require("../controllers/progressController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:id", protect, getReadingProgress);

router.patch("/:id", protect, updateReadingProgress);

module.exports = router;