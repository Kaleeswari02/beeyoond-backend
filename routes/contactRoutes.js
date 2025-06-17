const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { submitContact } = require("../controllers/contactController");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

router.post("/contact", upload.single("resume"), (req, res, next) => {
  next(); 
}, submitContact);

module.exports = router;
