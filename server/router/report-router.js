const express = require("express");
const Report = require("../models/report-model");
const upload = require("../middlewares/uploads_middleware"); // Import the multer middleware
const ReportForm = require("../controllers/report-controller"); // Import your controller if you want to keep things modular

const router = express.Router();

// POST route to handle the report submission with image upload
router.post("/report", upload.single("image"), async (req, res) => {
  try {
   
    // Destructure the form data from the request body
    const { disaster, description, location, reportTime } = req.body;

    // Handle image file upload (save image filename if uploaded)
    const img = req.file ? req.file.filename : null;

    // Create a new report entry in the database
    const newReport = new Report({
      disaster,
      description,
      location,
      reportTime,
      img,// Store image filename in the report document
    });

    // Save the new report to the database
    await newReport.save();

    // Send success response
    res.status(200).json({ message: "Report submitted successfully" });
  } catch (error) {
    console.error("Error submitting report:", error);
    res.status(500).json({ message: "Error submitting report" });
  }
});

// Alternative: If you're using a controller to handle the logic, you can also define it like this
// router.post("/report", ReportForm);

module.exports = router;
