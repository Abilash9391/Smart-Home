const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const fs = require('fs');
const path = require('path');
const mongoose =require('mongoose');

// const tlsOptions = {
//   minVersion: 'TLSv1.2', // Ensure the correct TLS version
// };

mongoose.connect("mongodb://localhost:27017/SmartHome", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl:false
}).then(()=>{
    console.log("Connected to MongoDB Compass successfully...");
}).catch((err)=>{
    console.log("Something went wrong while connecting to MongoDB Compass");
})

const app = express();
const port = process.env.PORT || 3005;

app.use(cors());
app.use(bodyParser.json());    
app.use('/api/rooms', require('./routes/rooms.js'));
app.use('/api/devices', require('./routes/devices.js'));
app.use('/api/sensor', require('./routes/sensor.js'));
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});