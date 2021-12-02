import React, { useState, useEffect } from 'react';
import { Card, Tab, Row, Col, Nav } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { api } from "../../utils";
import ListD from '../devices/list';

export default function Gateway() {
    let params = useParams();
    const [gateway, setGateway] = useState({});
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        api.get('gateways/' + params.gatewayId).then(x => {
            setGateway(x)
            setDevices(x?.devices)
        });
    }, [params.gatewayId]);

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
            <Card>
                <Card.Header as="h5">Details</Card.Header>
                <Card.Body>
                    <Card.Title>Gateway {gateway?.serialNumber}</Card.Title>
                    <Tab.Container id="left-tabs" defaultActiveKey="first">
                        <Row>
                            <Col sm={3}>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                        <Nav.Link eventKey="first">Gateway</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">Devices</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <div className="row justify-content-center">
                                            <div className="col">
                                                <div className="form-group row mt-5">
                                                    <label htmlFor="createdAt" className="col-form-label col-3">Serial number</label>
                                                    <div className="col-9">
                                                        {gateway?.serialNumber}
                                                    </div>
                                                </div>
                                                <div className="form-group row mt-5">
                                                    <label htmlFor="createdAt" className="col-form-label col-3">Name</label>
                                                    <div className="col-9">
                                                        {gateway?.name}
                                                    </div>
                                                </div>
                                                <div className="form-group row mt-5">
                                                    <label htmlFor="createdAt" className="col-form-label col-3">IPv4</label>
                                                    <div className="col-9">
                                                        {gateway?.ipv4}
                                                    </div>
                                                </div>
                                                <div className="form-group row mt-5">
                                                    <label htmlFor="createdAt" className="col-form-label col-3">Devices</label>
                                                    <div className="col-9">
                                                        {devices?.length}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        Devices
                                        <ListD devices={devices} deleteDevice={deleteDevice} from="gateways" />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>

                    <Link to="/gateways" className="btn btn-sm btn-success mb-2 mt-5">Gateways</Link>
                </Card.Body>
            </Card>
        </>
    );
}