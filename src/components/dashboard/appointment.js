import { Component } from 'react';
export default class DashboardAppointmentComponent extends Component {
    render() {
        return (<tr>
            <td>
                <h2 className="table-avatar">
                    <a href="patient-profile.html" className="avatar avatar-sm mr-2"><img className="avatar-img rounded-circle" src="assets/img/patients/patient3.jpg" alt="User Image" /></a>
                    <a href="patient-profile.html">Carl Kelly <span>#PT0003</span></a>
                </h2>
            </td>
            <td>30 Oct 2019 <span className="d-block text-info">9.00 AM</span></td>
            <td>General</td>
            <td>Old Patient</td>
            <td className="text-center">$100</td>
            <td className="text-right">
                <div className="table-action">
                    <a  className="btn btn-sm bg-info-light">
                        <i className="far fa-eye"></i> View
                </a>

                    <a  className="btn btn-sm bg-success-light ml-1">
                        <i className="fas fa-check"></i> Accept
                </a>
                    <a  className="btn btn-sm bg-danger-light ml-1">
                        <i className="fas fa-times"></i> Cancel
                </a>
                </div>
            </td>
        </tr>);
    }
}