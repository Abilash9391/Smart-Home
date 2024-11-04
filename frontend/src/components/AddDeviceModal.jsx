"use client";
import { useState, useEffect,useRef } from "react";
import '../styles/Modal.css';


export default function AddDeviceModal({ isOpen, onClose, darkMode = false ,roomId,onDeviceAdded}) {
  const [deviceName, setDeviceName] = useState("");
  const [room, setRoom] = useState("");
  const [devices,setDevices]=useState([])
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      fetchDevices();
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen,handleClickOutside]);


  const fetchDevices = () => {
    const storedDevices = JSON.parse(localStorage.getItem('devices')) || [];
    setDevices(storedDevices);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!deviceName || !room) {
      alert("Please fill in both device name and room.");
      return;
  }
    const formData = {
      deviceName: deviceName,
      roomId:roomId
    };
  

      const newDevice = {
          name: formData.deviceName,
          roomId: roomId,
      }
      const updatedDevices = [...devices, newDevice];
      localStorage.setItem('devices', JSON.stringify(updatedDevices));
      setDevices(updatedDevices);

    console.log("Adding device:", {  deviceName ,roomId });
    try {
      const response = await fetch('http://localhost:3005/api/devices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      else{
        onDeviceAdded();
        setDeviceName("");
        setRoom("");
        onClose();
      }
    }
    catch (error) {
      console.error('Error:', error);
      setDeviceName("");
      setRoom("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-background">
      <div className={`modal-box ${darkMode ? 'dark' : ''}`}  ref={modalRef}>
        <div className="modal-header">
          <h2 className={`modal-title ${darkMode ? 'dark' : ''}`}>Add New Device</h2>
          <button onClick={onClose} className="modal-close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          {/* <div>
            <label htmlFor="deviceType" className={`form-label ${darkMode ? 'dark' : ''}`}>Device Type</label>
            <select
              id="deviceType"
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              className={`form-input ${darkMode ? 'dark' : ''}`}
              required
            >
              <option value="">Select a device type</option>
              <option value="light">Light</option>
              <option value="thermostat">Thermostat</option>
              <option value="lock">Smart Lock</option>
              <option value="camera">Camera</option>
            </select>
          </div> */}
          <div>
            <label htmlFor="deviceName" className={`form-label ${darkMode ? 'dark' : ''}`}>Device Name</label>
            <input
              type="text"
              id="deviceName"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              placeholder="Enter device name"
              className={`form-input ${darkMode ? 'dark' : ''}`}
              required
            />
          </div>
          {/* <div>
            <label htmlFor="room" className={`form-label ${darkMode ? 'dark' : ''}`}>Room</label>
            <input
              type="text"
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="Enter room name"
              className={`form-input ${darkMode ? 'dark' : ''}`}
              required
            />
          </div> */}
          <button
            type="submit"
            className="modal-submit-btn"
          >
            Add Device
          </button>
        </form>
      </div>
    </div>
  );
}