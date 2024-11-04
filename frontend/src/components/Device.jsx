import React from "react";
import Swal from 'sweetalert2';
import '../styles/Device.css';
import Switch from "./Switch";

function Device(props){
    const [deviceStatus,setDeviceStatus]=React.useState(props.status);
    
    const handleToggle=async()=>{
        try{
            const response = await fetch(`http://localhost:3005/api/devices/${props.deviceId}`,{
                method: 'PUT'
            });
            const data = await response.json();
            setDeviceStatus(data.status);
          } catch (error) {
            console.error(error);
          }
    }
    
    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!'
        });
        if (result.isConfirmed) {
            try {
                await fetch(`http://localhost:3005/api/devices/${props.deviceId}`,
                    { method:'DELETE'}
                );
                Swal.fire('Deleted!', 'Your device has been deleted.', 'success');
                props.onDeviceDeleted();
            } catch (error) {
                console.error("Error deleting device:", error);
                Swal.fire('Error!', 'There was an error deleting the device.', 'error');
            }
        }
    };

    return(
        <div className="container m-2 p-3 device">
            <div className="hel d-flex">
                <p className="name">{props.name}</p>
                <button className="del rounded" onClick={handleDelete}>X</button>
            </div>
            <div className="controls">
                <Switch onToggle={handleToggle} status={deviceStatus}/>
            </div>
        </div>
    );
}

export default Device;