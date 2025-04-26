const Emergency = require("../models/Emergency-model");  // (capital E) model

// Create a new emergency report
const reportEmergency = async (req, res) => {
  try {
    const { name, email, latitude, longitude } = req.body;

    const newEmergency = new Emergency({
      name,
      email,
      latitude,
      longitude,
      timestamp: new Date(),
    });

    await newEmergency.save();

    res.status(201).json({ message: "Emergency reported successfully!" });
  } catch (error) {
    console.error('Error reporting emergency:', error);
    res.status(500).json({ message: "Server error while reporting emergency" });
  }
};

// Fetch all emergency reports
const getAllEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find().sort({ timestamp: -1 });
    res.json(emergencies);
  } catch (error) {
    console.error('Error fetching emergencies:', error);
    res.status(500).json({ message: "Server error while fetching emergencies" });
  }
};

const deleteEmergency = async (req, res) => {
  try {
    const { id } = req.params;
    const emergency = await Emergency.findByIdAndDelete(id);

    if (!emergency) {
      return res.status(404).json({ message: 'Emergency not found' });
    }

    res.status(200).json({ message: 'Emergency deleted successfully' });
  } catch (error) {
    console.error("Error deleting emergency:", error);
    res.status(500).json({ message: 'Server error while deleting emergency' });
  }
};


// Exporting both functions
module.exports = { reportEmergency, getAllEmergencies, deleteEmergency, };
