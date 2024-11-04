import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AddRoomModal from './AddRoomModal';
import { useState } from "react";
import '../styles/Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [allRooms, setAllRooms] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/rooms');
        if (!response.ok) {
          throw new Error('Network response not ok')
        }
        const data = await response.json();
        console.log(data);
        setAllRooms(data);
      }
      catch (error) {
        console.error(error);
      }
    };
    fetchRooms();
  }, [fetchTrigger]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleRoomAdded = () => {
    setFetchTrigger(prev => !prev);
  }


  return (
    <nav className="navbar navbar-expand-lg addr">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Home</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {allRooms.map((room) => (
              <li>
                <a key={room._id} className="nav-link active" aria-current="page" href={`/${room.roomName.toLowerCase()}`}>{room.roomName}</a>
              </li>
            ))}
          </ul>
          <button onClick={toggleModal}
            classNameName="addr">
            + Add
          </button>

          {isOpen && (
            <div classNameName="modal-overlay">
              <AddRoomModal isOpen={isOpen} onClose={toggleModal} onRoomAdded={handleRoomAdded} roomsP={allRooms} />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
  export default Navbar;
