const Report = require("../models/report-model");

const createReport = async (req, res) => {
  try {
    const { disaster, description, location, reportTime } = req.body;

    if (!disaster || !description || !location || !reportTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newReport = new Report({
      disaster,
      description,
      location,
      reportTime,
      img: req.file.filename,  // Image optional
      user: req.user._id,
    });

    await newReport.save();

    return res.status(201).json({ message: "Report submitted successfully", report: newReport });
  } catch (error) {
    console.error("Error submitting report:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("user", "username email role") // populate user details
      .sort({ createdAt: -1 });

    return res.status(200).json({ reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Report.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Report not found" });
    }
    return res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error("Error deleting report:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { disaster, description, location, reportTime } = req.body;

    const updatedReport = await Report.findByIdAndUpdate(
      id,
      { disaster, description, location, reportTime },
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    return res.status(200).json({ message: "Report updated successfully", report: updatedReport });
  } catch (error) {
    console.error("Error updating report:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createReport,
  getAllReports,
  deleteReport,
  updateReport,
};
