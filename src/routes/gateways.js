import React, { useState, useEffect } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import List from '../components/gateways/list';
import { api } from "../utils";

export default function Gateways() {
  let location = useParams();

  const [gateways, setGateways] = useState(null);

  useEffect(() => {
    if (location.r) setGateways([])
    api.get('gateways').then(x => setGateways(x));
  }, [location]);

  function deleteGateway(id) {
    setGateways(gateways.map(x => {
      if (x._id === id) { x.isDeleting = true; }
      return x;
    }));
    api.delete('gateways/' + id).then(() => {
      setGateways(gateways => gateways.filter(x => x._id !== id));
    });
  }

  return (
    <>
      <h1>Gateways</h1>
      <Link to={`add`} className="btn btn-sm btn-success mb-2">Add gateway</Link>
      <List deleteGateway={deleteGateway} gateways={gateways} />
      <hr />
      <Outlet />
    </>
  );
}