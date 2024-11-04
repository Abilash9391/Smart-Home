const Room = require("../model/room.model");

async function getRooms(req, res) {
    try {
      const rooms = await Room.find({});
      res.status(200).send(rooms);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error fetching rooms' });
    }
  }

  async function addRoom(req,res) {
    try {
      const {roomName}=req.body;
      const room = new Room({roomName:roomName});
      await room.save();
      res.status(201).send(room);
      console.log("room added");
    }
    catch(error){
      console.error(error);
      res.status(500).send({ message: "Error adding room", error });
    }
  }
module.exports={
    getRooms,
    addRoom
}
