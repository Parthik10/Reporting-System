//for submitting the report form 
const Report = require("../models/report-model");

const reportForm = async (req, res) => {
    try {
        const { disaster, location, reportTime, description } = req.body;  // Destructure the fields from the request body

        const newReport = new Report({
            disaster,
            location,
            reportTime,
            description
        });

        await newReport.save();
        return res.status(200).json({ message: "Report submitted successfully" });
    } catch (error) {
        console.error("Error submitting report:", error);
        return res.status(500).json({ message: "Error submitting report" });
    }
};

module.exports = reportForm;
