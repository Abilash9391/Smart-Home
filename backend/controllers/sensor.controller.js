const SensorData=require('../model/sensorData.model.js');
 

async function getData(req,res) {
    // const roomName=req.params.roomName;
    try{
        const data=await SensorData.find({}).sort({createdAt:-1}).limit(10);
        if(!data){
            return res.status(404).json({message:"data not found"});
            
        }
        res.json(data);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
}


async function addData(req,res) {
    const  {temperature,humidity}=req.body;
    try{
        const now=new Date();
        const newSensorData = await SensorData.create({
            temperature,
            humidity,
            date: now.toISOString().split('T')[0],
            time: now.toTimeString().split(' ')[0]
        });
        res.status(201).json(newSensorData);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }

}



module.exports={
    getData,
    addData
}