const User = require("../models/User");

const updateReadingProgress = async (req, res) => {
  try {
    const { progress, currentPage } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const existingProgress = user.readingProgress.find(
      (item) => item.book.toString() === req.params.id
    );

    if (existingProgress) {
      existingProgress.progress = progress;
      existingProgress.currentPage = currentPage;
    } else {
      user.readingProgress.push({
        book: req.params.id,
        progress,
        currentPage
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Reading progress updated"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getReadingProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const reading = user.readingProgress.find(
      (item) => item.book.toString() === req.params.id
    );

    res.status(200).json({
      success: true,
      progress: reading ? reading.progress : 0,
      currentPage: reading ? reading.currentPage : 1
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  updateReadingProgress,
  getReadingProgress
};