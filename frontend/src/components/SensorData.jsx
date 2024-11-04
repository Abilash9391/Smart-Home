import React from "react";
import Sensor from "./Sensor";
import { useState,useEffect } from "react";
import '../styles/SensorData.css'

function SensorData(props) {

    const [sensorData, setSensorData] = useState([]);

    useEffect(() => {
        const fetchSensorData = async () => {
            try {
                const response = await fetch('http://localhost:3005/api/sensor'); // Adjust the API endpoint as needed
                const data = await response.json();
                setSensorData(data);
            } catch (error) {
                console.error("Error fetching sensor data:", error);
            }
        };
        fetchSensorData();

        const intervalId = setInterval(() => {
            fetchSensorData();
        }, 5000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const currentTemperature = sensorData.length > 0 ? sensorData[sensorData.length-1].temperature : null;
    const currentHumidity = sensorData.length > 0 ? sensorData[sensorData.length-1].humidity : null;
    return (
        <div className="container-fluid  p-4 sensordata d-flex" >
            <div className="item ">
                <p >Welcome Home</p>
                <div className="container roomName mb-1">{props.roomName}</div>
            </div>
            <div className="d-flex flex-wrap sensors">
                <Sensor value={currentTemperature} name='Temperature' />
                <Sensor value={currentHumidity} name='Humidity' />
            </div>
        </div>
    );
}

export default SensorData;