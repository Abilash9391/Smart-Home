const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({
  roomName: String,
  // devices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Device' }]
});


const Room = mongoose.model('Room', roomSchema);
console.log("Room created");
module.exports = Room;