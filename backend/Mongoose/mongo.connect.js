const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/SmartHome").then(()=>{
    console.log("Connected to MongoDB Compass successfully...");
}).catch((err)=>{
    console.log("Somoething went wrong while connecting to MongoDB Compass");
})

module.exports = mongoose;