import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Outlet, Link, Route, Routes } from "react-router-dom";
import Home from "./routes/home";
import Devices from "./routes/devices";
import Device from "./components/devices/device";
import DeviceAddOrEdit from "./components/devices/addoredit";
import Gateways from "./routes/gateways";
import Gateway from "./components/gateways/gateway";
import GatewayAddOrEdit from "./components/gateways/addoredit";

function App() {
  return (
    <Router>
      <main style={{ padding: "1rem" }}>
        <div className="App">
          <header className="App-header">
            <Navbar bg="dark" variant="dark">
              <Container>
                <Navbar.Brand>
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </Navbar.Brand>

                <Nav className="justify-content-end">
                  <Nav>
                    <Link to="/gateways/add" className="nav-link">
                      Create Gateway
                    </Link>
                  </Nav>

                  {<Nav>
                    <Link to="/gateways" className="nav-link">
                      Gateway List
                    </Link>
                  </Nav>}

                  <Nav>
                    <Link to="/devices" className="nav-link">
                      Device List
                    </Link>
                  </Nav>
                </Nav>

              </Container>
            </Navbar>
          </header>

          <Container>
            <Row>
              <Col md={12}>
                <div className="wrapper">
                  <Outlet />
                </div>
              </Col>
            </Row>
          </Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="gateways" element={<Gateways />} >
              <Route path="add" element={<GatewayAddOrEdit />} />
              <Route path=":gatewayId" element={<Gateway />}/>
              <Route path=":gatewayId/edit" element={<GatewayAddOrEdit />} />
            </Route>
            <Route path="devices" element={<Devices />} >
              <Route path="add" element={<DeviceAddOrEdit />} />
              <Route path=":deviceId" element={<Device />} />
              <Route path=":deviceId/edit" element={<DeviceAddOrEdit />} />
            </Route>
            <Route path="*" element={<p>Not found!</p>}
            />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
