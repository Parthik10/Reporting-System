const express = require('express');
const Report = require("../models/report-model");
const upload = require("../middlewares/uploads_middleware"); // Import multer middleware

const router = express.Router();

// POST route to handle the report submission
router.post("/api/reportform/report", upload.single("image"), async (req, res) => {
  try {


    // Destructure fields from request body
    const { disaster, description, location, reportTime } = req.body;

    // Ensure all required fields are present
    if (!disaster || !description || !location || !reportTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Ensure an image is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Save the new report to the database
    const newReport = new Report({
      disaster,
      description,
      location,
      reportTime,
      img: req.file.path, // Save the file path provided by multer
    });

    await newReport.save();

    // Respond with success message
    return res.status(200).json({ message: "Report submitted successfully" });
  } catch (error) {
    console.error("Error submitting report:", error);
    return res.status(500).json({ message: "Error submitting report" });
  }
});

module.exports = router;
