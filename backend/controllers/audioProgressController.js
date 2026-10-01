const User = require("../models/User");

const updateAudioProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const { currentTime } = req.body;
    const bookId = req.params.id;

    if (currentTime < 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid audio position"
      });
    }

    const existingProgress =
      user.audioProgress.find(
        (item) =>
          item.book.toString() === bookId
      );

    if (existingProgress) {
      existingProgress.currentTime =
        currentTime;
    } else {
      user.audioProgress.push({
        book: bookId,
        currentTime
      });
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Audio progress updated",
      currentTime
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getAudioProgress = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const progress =
      user.audioProgress.find(
        (item) =>
          item.book.toString() ===
          req.params.id
      );

    res.status(200).json({
      success: true,
      currentTime: progress
        ? progress.currentTime
        : 0
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  updateAudioProgress,
  getAudioProgress
};