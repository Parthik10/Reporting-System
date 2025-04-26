const express = require('express');
const { reportEmergency, getAllEmergencies,deleteEmergency } = require('../controllers/emergencyController');

const router = express.Router();

// Report a new emergency
router.post('/', reportEmergency);

// Get all emergencies
router.get('/', getAllEmergencies);

router.delete('/:id', deleteEmergency);

module.exports = router;
