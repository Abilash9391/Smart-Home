const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    temperature: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    date: {
        type: String, // Store date as a string (YYYY-MM-DD)
        required: true
    },
    time: {
        type: String, // Store time as a string (HH:MM:SS)
        required: true
    }
  });

  
const SensorData = mongoose.model('SensorData', DataSchema);
console.log('Data created');
module.exports = SensorData;