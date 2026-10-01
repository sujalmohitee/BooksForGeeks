const express = require("express");

const {
  updateAudioProgress,
  getAudioProgress
} = require("../controllers/audioProgressController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:id", protect, getAudioProgress);

router.patch("/:id", protect, updateAudioProgress);

module.exports = router;