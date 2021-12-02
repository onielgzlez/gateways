import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { api } from "../utils";
import List from "../components/devices/list";

export default function Devices() {
    let location = useParams();

    const [devices, setDevices] = useState([]);

    useEffect(() => {
        if (location.r) setDevices([])
        
        api.get('devices').then(x => setDevices(x));
    }, [location]);

    const deleteDevice = id => {
        setDevices(devices.map(x => {
            if (x._id === id) { x.isDeleting = true; }
            return x;
        }));
        api.delete('devices/' + id).then(() => {
            setDevices(devices => devices.filter(x => x._id !== id));
        });
    }

    return (
        <>
            <h1>Devices</h1>
            <Link to={`add`} className="btn btn-sm btn-success mb-2">Add Device</Link>
            <List deleteDevice={deleteDevice} devices={devices} />
            <hr />
            <Outlet />
        </>
    );
}