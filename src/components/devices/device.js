import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { api } from "../../utils";
export default function Device() {
    let params = useParams();
    const [device, setDevice] = useState({});

    useEffect(() => {
        api.get('devices/' + params.deviceId).then(x => setDevice(x));
    }, [params.deviceId]);

    const toDate = s => s && s.split('T').length ? s.split('T')[0] : s

    return (
        <>
            <Card>
                <Card.Header as="h5">Details</Card.Header>
                <Card.Body>
                    <Card.Title>Device {device?.uid}</Card.Title>
                    <div className="row justify-content-center">
                        <div className="col">
                            <div className="form-group row mt-5">
                                <label htmlFor="createdAt" className="col-form-label col-3">UID</label>
                                <div className="col-9">
                                    {device?.uid}
                                </div>
                            </div>
                            <div className="form-group row mt-5">
                                <label htmlFor="createdAt" className="col-form-label col-3">Vendor</label>
                                <div className="col-9">
                                    {device?.vendor}
                                </div>
                            </div>
                            <div className="form-group row mt-5">
                                <label htmlFor="createdAt" className="col-form-label col-3">Date created</label>
                                <div className="col-9">
                                    {toDate(device?.createdAt)}
                                </div>
                            </div>
                            <div className="form-group row mt-5">
                                <label htmlFor="createdAt" className="col-form-label col-3">Status</label>
                                <div className="col-9">
                                    {device?.status}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to="/devices" className="btn btn-sm btn-success mb-2">Devices</Link>
                </Card.Body>
            </Card>
        </>
    );
}