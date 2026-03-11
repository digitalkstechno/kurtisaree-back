const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware'); // Import our custom multer setup

// Route for single image upload
// 'image' is the fieldname expected in FormData from frontend
router.post('/', (req, res, next) => {
  // Debug log
  console.log('Upload request received');
  console.log('Headers:', req.headers['content-type']);
  next();
}, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      console.log('Request Body:', req.body); // Check if data was sent but not as a file
      return res.status(400).send({ message: 'No file uploaded. Make sure fieldname is "image"' });
    }

    // Return the path for the saved image
    // Using '/uploads/filename.ext' so it can be served as static
    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    console.error('File Upload Route Error:', error);
    res.status(500).send({ message: 'Server error during file upload', error: error.message });
  }
});

module.exports = router;
