const express = require("express");

const upload = require("../middleware/uploadMiddleware");
const { uploadFile } = require("../controllers/uploadController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", protect, admin, upload.single("file"), uploadFile);

module.exports = router;