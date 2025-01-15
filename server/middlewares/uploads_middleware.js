const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Ensure the uploads directory exists or create it
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Set destination folder
  },
  filename: (req, file, cb) => {
    // Generate a unique filename using timestamp and original file name
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create multer instance with storage and file validation
const upload = multer({storage});

module.exports = upload; // Export the upload middleware
