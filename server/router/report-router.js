const express = require("express");
const upload = require("../middlewares/uploads_middleware");
const { authMiddleware, adminMiddleware } = require("../middlewares/auth.middleware");
const {
  createReport,
  getAllReports,
  deleteReport,
  updateReport,
} = require("../controllers/report-controller");

const router = express.Router();

// User: Create a report
router.post("/report", authMiddleware, upload.single("image"), createReport);

// Admin: Get all reports
router.get("/admin/reports", authMiddleware, adminMiddleware, getAllReports);

// Admin: Delete a report
router.delete("/admin/report/:id", authMiddleware, adminMiddleware, deleteReport);

// Admin: Update a report
router.put("/admin/report/:id", authMiddleware, adminMiddleware, updateReport);

module.exports = router;
