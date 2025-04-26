const mongoose = require('mongoose');  // CommonJS style import

const emergencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Emergency = mongoose.model('Emergency', emergencySchema);

module.exports = Emergency;  // Export model in CommonJS style
