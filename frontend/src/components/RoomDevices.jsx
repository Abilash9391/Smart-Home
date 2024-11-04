import React, { useRef, useState ,useEffect} from "react";
import Device from "./Device";
import PropTypes from 'prop-types';
import '../styles/RoomDevices.css'
import AddDeviceModal from "./AddDeviceModal";

function RoomDevices(props) {
  const [devices, setDevices] = useState(props.devices|| []);
  const [fetchTrigger,setFetchTrigger]=useState(false);

  useEffect(()=>{
    try{
      var fetchRooms=async ()=>{
        const response = await fetch(`http://localhost:3005/api/devices/${props.roomName}`);
        const data=await response.json();
        setDevices(data);
      }
    } catch (error) {
      console.error("Error fetching devices:", error);
    }

    fetchRooms();
  },[props.roomName,fetchTrigger])

   
  const handleDeviceAdded = () => {
    setFetchTrigger(prev => !prev);
    toggleModal();
  };

  const handleDeviceDeleted =()=>{
    setFetchTrigger(prev => !prev);
  }

  
  const devicesContainerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleArrowClick = (direction) => {
    const devices = devicesContainerRef.current.children;
    const deviceWidth = devices[0].offsetWidth;
    const deviceMargin = parseInt(window.getComputedStyle(devices[0]).marginRight);
    const devicePadding = parseInt(window.getComputedStyle(devicesContainerRef.current).paddingLeft);
    const currentScrollPosition = devicesContainerRef.current.scrollLeft;
  
    if (direction === 'left') {
      devicesContainerRef.current.scrollLeft = currentScrollPosition - (deviceWidth + deviceMargin + devicePadding);
    } else if (direction === 'right') {
      devicesContainerRef.current.scrollLeft = currentScrollPosition + (deviceWidth + deviceMargin + devicePadding);
    }
  };


  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="d-flex flex-column container-fluid room-devices">
      <div className="arrows container">
        <i className="fas fa-circle-arrow-left l" onClick={() => handleArrowClick('left')}></i>
        <i className="fas fa-circle-arrow-right r" onClick={() => handleArrowClick('right')}></i>
      </div>
      <div ref={devicesContainerRef} className="container d-flex p-2 m-3 devices">
        {devices.map((device) => (
          <Device key={device._id}
          deviceId={device._id} 
          name={device.name}
          status={device.status} 
          onDeviceDeleted={handleDeviceDeleted} />
        ))}
        <button onClick={toggleModal}
          className="add">
          Add Device
        </button>
      </div>
          {isOpen && (
            <div className="modal-overlay">
              <AddDeviceModal isOpen={isOpen} onClose={toggleModal} roomId={props.roomId} onDeviceAdded={handleDeviceAdded}/>
            </div>
          )}
    </div>
);
}

RoomDevices.propTypes = {
  devices: PropTypes.array.isRequired,
};
export default RoomDevices;
