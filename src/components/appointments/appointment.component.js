import { Component } from 'react';
import moment from 'moment';
export default class AppointmentCard extends Component {
    constructor(props){
        super(props);
        this.state={appointment:this.props.appointment}
    }
    render() {
        return (<div className="appointment-list">
        <div className="profile-info-widget">
            <a href="#" className="booking-doc-img">
                <img src={"https://www.iclick-italk.com/"+this.state.appointment.image+"?w=20&h=20"} alt="User Image" />
            </a>
            <div className="profile-det-info">
                <h3><a href="#">{this.state.appointment.firstName} {this.state.appointment.lastName}</a></h3>
                <div className="patient-details">
                    <h5><i className="far fa-clock"></i> {moment(this.state.appointment.start_time).format("hh:mm a")} - {moment(this.state.appointment.end_time).format("hh:mm a")}</h5>
                    <h5><i className="fas fa-map-marker-alt"></i> {this.state.appointment.address}</h5>
                    <h5><i className="fas fa-envelope"></i> {this.state.appointment.email}</h5>
                    <h5 className="mb-0"><i className="fas fa-phone"></i> {this.state.appointment.phonecode} {this.state.appointment.phonenumber}</h5>
                </div>
            </div>
        </div>
        <div className="appointment-action">
            {/* <a href="#" className="btn btn-sm bg-info-light" data-toggle="modal" data-target="#appt_details" onClick={()=>{this.props.onViewClick(this.state.appointment.id)}}>
                <i className="far fa-eye"></i> View
                    </a> */}
                {
                    (!this.state.appointment.status || this.state.appointment.status === 0) &&
                    <a className="btn btn-sm bg-success-light" onClick={() => { this.props.onAcceptClick(this.state.appointment.saId) }}>
                        <i className="fas fa-check"></i> Accept
                    </a>
                }


                {
                    (!this.state.appointment.status || this.state.appointment.status === 0) &&
                    <a className="btn btn-sm bg-danger-light" onClick={() => { this.props.onCancelClick(this.state.appointment.saId) }}>
                        <i className="fas fa-times"></i> Cancel
                    </a>
                }
                {
                    this.state.appointment.status &&this.state.appointment.status==1&&
                    <a className="btn btn-sm bg-success-light">
                        <i className="fas fa-check"></i> Accepted
                    </a>
                }
                {
                    this.state.appointment.status &&this.state.appointment.status==2&&
                    <a className="btn btn-sm bg-danger-light">
                        <i className="fas fa-times"></i> Canceled
                    </a>
                }
                
        </div>
    </div>);
    }
}