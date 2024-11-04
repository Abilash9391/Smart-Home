const express = require('express');

const router = express.Router();
const {getData ,addData}=require('../controllers/sensor.controller.js');


// GET sensor data
router.get('/',getData);

// POST update sensor data (simulating sensor updates)
router.post('/',addData );

module.exports = router;