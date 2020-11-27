import { Component } from 'react';
import { prod } from '../../config/index.json';
import cookie from 'js-cookie';
import { Link, NavLink } from 'react-router-dom';
export default class DoctorSideNavComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }
    logout() {
        cookie.remove("auth");
        window.location.href = "/#/auth/login";
    }
    componentDidMount() {
        var user = JSON.parse(cookie.get("auth"));
        this.setState({ user: user });
    }
    render() {
        return (<div className="theiaStickySidebar" ><div className="profile-sidebar">
            <div className="widget-profile pro-widget-content">
                <div className="profile-info-widget">
                    <a href="#" className="booking-doc-img">
                        <img src={prod.baseurl + this.state?.user?.profile} alt="User Image" />
                    </a>
                    <div className="profile-det-info">
                        <h3>Dr. {this.state?.user?.firstname} {this.state?.user?.lastname}</h3>

                        <div className="patient-details">
                            <h5 className="mb-0"> {this.state?.user?.address} </h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashboard-widget">
                <nav className="dashboard-menu">
                    <ul>
                        <li>
                            <NavLink activeClassName="active-link" exact to="/"><i className="fas fa-columns"></i>
                                <span>Dashboard</span></NavLink>

                        </li>
                        <li>
                            <NavLink activeClassName="active-link" exact to="/appointments"><i className="fas fa-calendar-check"></i>
                                <span>Appointments</span></NavLink>

                        </li>
                        <li>
                            <NavLink activeClassName="active-link" exact to="/patients">
                                <i className="fas fa-user-injured"></i>
                                <span>My Patients</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active-link" exact to="/scheduler">
                                <i className="fas fa-hourglass-start"></i>
                                <span>Schedule Timings</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active-link" exact to="/profile">
                                <i className="fas fa-user-cog"></i>
                                <span>Profile Settings</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink activeClassName="active-link" exact to="/change-password">
                                <i className="fas fa-lock"></i>
                                <span>Change Password</span>
                            </NavLink>
                        </li>
                        <li>
                            <a onClick={this.logout}>
                                <i className="fas fa-sign-out-alt"></i>
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        </div>

        );
    }
}