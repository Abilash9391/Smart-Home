import React from "react";
import '../styles/Sensor.css'


function Sensor(props){
    return(
        <div className="sensor">
            <p>{props.name}</p>
            <div className="Value">{props.value}{props.name==='Temperature' ? '°C' : '%'}</div>
            
        </div>
    );
}

export default Sensor;