const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    name: String,
    roomId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Room' 
    },
    status : {
      type: Boolean,
      default: false
    }
  });

  
const Device = mongoose.model('Device', deviceSchema);
console.log('Device created');
module.exports = Device;