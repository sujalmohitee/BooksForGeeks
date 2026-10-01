const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const externalBookRoutes = require("./routes/externalBookRoutes");
const bookRoutes = require("./routes/bookRoutes");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const progressRoutes = require("./routes/progressRoutes");
const audioProgressRoutes = require("./routes/audioProgressRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const path = require("path");

dotenv.config();


const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);

app.use("/api/external-books", externalBookRoutes);

app.get("/", (req, res) => {
    res.send("Books & Audiobooks API is running!");
});

app.use("/api/auth", authRoutes);

app.use("/api/progress", progressRoutes);

app.use(
  "/api/audio-progress",
  audioProgressRoutes
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/uploads", uploadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});