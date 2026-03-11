const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware'); // Import our custom multer setup

// Route for single image upload
// 'image' is the fieldname expected in FormData from frontend
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded. Make sure fieldname is "image"' });
    }

    // Return the path for the saved image
    // Using '/uploads/filename.ext' so it can be served as static
    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    res.status(500).send({ message: 'Server error during file upload' });
  }
});

module.exports = router;
