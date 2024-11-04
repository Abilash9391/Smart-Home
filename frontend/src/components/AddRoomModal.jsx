"use client";
import { useState, useEffect,useRef,useCallback } from "react";
import '../styles/Modal.css';


export default function AddDeviceModal({ isOpen, onClose, darkMode = false,onRoomAdded }) {
  const [room, setRoom] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleClickOutside = useCallback((e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleClickOutside]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!room) {
      alert("Please fill the room name.");
      return;
  }

    console.log("Adding room:");
    try {
      const response = await fetch('http://localhost:3005/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({roomName:room}),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      else{
        onRoomAdded();
        setRoom("");
        onClose();
  }
    
    }
    catch (error) {
      console.error('Error:', error);
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
          <div>
            <label htmlFor="room" className={`form-label ${darkMode ? 'dark' : ''}`}>Room Name</label>
            <input
              type="text"
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="Enter room name"
              className={`form-input ${darkMode ? 'dark' : ''}`}
              required
            />
          </div>
          <button
            type="submit"
            className="modal-submit-btn"
          >
            Add Room
          </button>
        </form>
      </div>
    </div>
  );
}
