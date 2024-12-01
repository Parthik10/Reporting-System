const express = require("express");

const router = express.Router();

const ReportForm = require("../controllers/report-controller");

router.route("/report").post(ReportForm);

module.exports = router; 