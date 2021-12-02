import React from 'react';
import { Link, useParams } from 'react-router-dom';
import GatewayForm from "./form";

export default function AddOrEdit() {
    let params = useParams();
    return (
        <>
            <h1>Gateway </h1>
            <Link to="/gateways" className="btn btn-sm btn-success mb-2">Gateways</Link>
            <GatewayForm id={params.gatewayId} />
        </>
    );
}