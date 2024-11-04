import React, { useState } from "react";
import '../styles/Switch.css'

const Switch = (props) => {

    const [isChecked, setIsChecked] = useState(props.status);

    const handleToggle = () => {
        setIsChecked(!isChecked);
        props.onToggle();
    };

    return (
          <div className="switch-container">
            <div className={`switch ${isChecked ? 'checked' : ''}`}>
              <input
                type="checkbox"
                id="switch"
                checked={isChecked}
                onChange={handleToggle}
              />
              <div className="toggle-button"></div>
            </div>
          <div className="status">{isChecked ? 'ON' : 'OFF'}</div>
        </div>
      );
}

export default Switch;