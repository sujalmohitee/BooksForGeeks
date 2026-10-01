const uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a file"
      });
    }

    const fileUrl =
      `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      fileUrl,
      fileName: req.file.filename
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = { uploadFile };