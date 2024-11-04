const Device = require("../model/device.model");
const Room= require("../model/room.model");
const mongoose =require('mongoose');

async function getAllDevices(req,res){
    const roomName=req.params.roomName;
    try{
        const room =await Room.findOne({roomName: new RegExp(`^${roomName}$`, 'i')});
        if(!room){
            return res.status(404).json({message:"Room not found"});
        }
        const devices = await Device.find({roomId: new mongoose.Types.ObjectId(room._id)});
        res.json(devices);

    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}

async function addDevice(req,res){
    const formData =req.body;
    try {
        if (!formData.roomId) {
            return res.status(404).send({ message: "Room not found" });
        }

        const newDevice = new Device({
            roomId: formData.roomId,
            name: formData.deviceName,
            status: false
        });

        await newDevice.save();
        res.status(201).send(newDevice);
        console.log("Device added successfully");

    } catch (error) {
        console.error("Error adding device:", error);
        res.status(500).send({ message: "Error adding device", error }); // Handle errors appropriately
    }
}

async function updateStatus(req,res){
    const {deviceId}=req.params;
    const dev=new mongoose.Types.ObjectId(deviceId);
    // const { status }=req.body;
    try{
        const device= await Device.findById(dev);
        // console.log("device: ",device);
        if(!device){
            return res.status(404).json({message:"Device not found"});
        }
        device.status= !device.status;
        await device.save();
        
        res.json(device);
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

async function deleteDevice(req,res) {
    const {deviceId}=req.params;
    try {
        const device = await Device.findByIdAndDelete(deviceId);
        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }
        res.json({ message: "Device deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports={
    getAllDevices,
    addDevice,
    updateStatus,
    deleteDevice
}