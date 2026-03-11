const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage for Multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // Use absolute path to ensure the 'uploads' folder is found regardless of where the server is started
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    // Generate a unique name: fieldname-timestamp.extension
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// File type validation (Images only)
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Images Only! (jpg, jpeg, png, webp)'));
  }
}

// Multer instance for a single image upload
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

module.exports = upload;
