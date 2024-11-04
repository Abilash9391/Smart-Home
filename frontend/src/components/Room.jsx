import React, { useState, useEffect } from "react";
import RoomDevices from "./RoomDevices";
import SensorData from "./SensorData";

function Room(props) {
  const [loading,setLoading]=useState(true);
  const [devicesList, setDevices] = useState([]);
  console.log(props.roomName);
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch(`http://localhost:3005/api/devices/${props.roomName}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
        const devices= await response.json();
          setDevices(devices);
        setLoading(false);
      } catch (error) {
        console.error('API error:',error);
        setLoading(false);
      }
    };
    fetchDevices();
  }, [props.roomName]);
  console.log("devices: ",devicesList);

  return (
    loading ? (
      <div>Loading...</div>
    ) :(
      <div className="Room">
      <SensorData roomName={props.roomName} />
      <RoomDevices roomName={props.roomName} devices={devicesList} roomId={props.roomId}/>
    </div>)
  );
}

export default Room;
