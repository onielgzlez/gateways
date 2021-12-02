import React from 'react';
import { Link, useParams } from 'react-router-dom';
import DeviceForm from "./form";

export default function AddOrEdit() {
    let params = useParams();
    return (
        <>
            <h1>Device </h1>
            <Link to="/devices" className="btn btn-sm btn-success mb-2">Devices</Link>
            <DeviceForm id={params.deviceId} />
        </>
    );
}