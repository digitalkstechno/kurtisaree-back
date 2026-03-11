const path = require('path');
const multer = require('multer');

// Configure storage for Multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // Store images in the 'uploads' folder
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
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Error: Images Only! (jpg, jpeg, png)');
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
