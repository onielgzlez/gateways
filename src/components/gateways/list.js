import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom';

const List = (props) => {
    const { gateways, deleteGateway } = props;

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Serial number</th>
                    <th>Name</th>
                    <th>IPv4</th>
                    <th>Devices</th>
                    <th style={{ width: '10%' }}></th>
                </tr>
            </thead>
            <tbody>
                {gateways && gateways.map(gateway =>
                    <tr key={gateway._id}>
                        <td><Link to={`${gateway._id}`}>{gateway.serialNumber}</Link></td>
                        <td>{gateway.name}</td>
                        <td>{gateway.ipv4}</td>
                        <td>{gateway.devices?.length}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>
                            <Link to={`${gateway._id}/edit`} className="btn btn-sm btn-primary" style={{ marginRight: 5 }}>Edit</Link>
                            <button onClick={() => deleteGateway(gateway._id)} className="btn btn-sm btn-danger btn-delete-gateway" disabled={gateway.isDeleting}>
                                {gateway.isDeleting
                                    ? <span className="spinner-border spinner-border-sm"></span>
                                    : <span>Delete</span>
                                }
                            </button>
                        </td>
                    </tr>
                )}
                {!gateways &&
                    <tr>
                        <td colSpan="5" className="text-center">
                            <div className="spinner-border spinner-border-lg align-center"></div>
                        </td>
                    </tr>
                }
                {gateways && !gateways.length &&
                    <tr>
                        <td colSpan="5" className="text-center">
                            <div className="p-2">No Gateways To Display</div>
                        </td>
                    </tr>
                }
            </tbody>
        </Table>
    )
}

export default List;