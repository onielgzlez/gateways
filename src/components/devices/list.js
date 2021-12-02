import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom';

const List = (props) => {
    const { devices, deleteDevice, from } = props;
    const toDate = s => {
        return s.split('T').length ? s.split('T')[0] : s
    }
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>UID</th>
                    <th>Vendor</th>
                    <th>Date created</th>
                    <th>Status</th>
                    <th style={{ width: '10%' }}></th>
                </tr>
            </thead>
            <tbody>
                {devices && devices.map(device =>
                    <tr key={device._id}>
                        <td><Link to={`${from === "gateways" ? '/devices/' + device._id : device._id}`}>{device.uid}</Link></td>
                        <td>{device.vendor}</td>
                        <td>{toDate(device.createdAt)}</td>
                        <td>{device.status}</td>
                        <td style={{ whiteSpace: 'nowrap' }}>
                            <Link to={`${from === "gateways" ? '/devices/' + device._id : device._id}/edit`} className="btn btn-sm btn-primary" style={{ marginRight: 5 }}>Edit</Link>
                            <button onClick={() => deleteDevice(device._id)} className="btn btn-sm btn-danger btn-delete-device" disabled={device.isDeleting}>
                                {device.isDeleting
                                    ? <span className="spinner-border spinner-border-sm"></span>
                                    : <span>Delete</span>
                                }
                            </button>
                        </td>
                    </tr>
                )}
                {!devices &&
                    <tr>
                        <td colSpan="5" className="text-center">
                            <div className="spinner-border spinner-border-lg align-center"></div>
                        </td>
                    </tr>
                }
                {devices && !devices.length &&
                    <tr>
                        <td colSpan="5" className="text-center">
                            <div className="p-2">No Devices To Display</div>
                        </td>
                    </tr>
                }
            </tbody>
        </Table>
    )
}

export default List;