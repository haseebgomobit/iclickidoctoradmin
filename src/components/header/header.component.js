import { Component } from 'react';
import { prod } from '../../config/index.json';
import cookie from 'js-cookie';
import { Link } from 'react-router-dom';
export default class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }
    componentDidMount() {
        var user = JSON.parse(cookie.get("auth"));
        this.setState({ user: user });
    }
    logout() {
        cookie.remove("auth");
        window.location.href = "/#/auth/login";
    }
    render() {
        return (<header className="header">
            <nav className="navbar navbar-expand-lg header-nav">
                <div className="navbar-header">
                    <a id="mobile_btn" href="#">
                        <span className="bar-icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </a>
                    <a href="/" className="navbar-brand logo">
                        <img src="assets/img/logo.png" className="img-fluid" alt="Logo" />
                    </a>
                </div>
                <div className="main-menu-wrapper">
                    <div className="menu-header">
                        <a href="index-2.html" className="menu-logo">
                            <img src="assets/img/logo.png" className="img-fluid" alt="Logo" />
                        </a>
                        <a id="menu_close" className="menu-close" href="#">
                            <i className="fas fa-times"></i>
                        </a>
                    </div>
                    <ul className="main-nav">
                        <li>
                            <Link activeclassname="active-link" to="/">Home</Link>
                        </li>
                        <li className="login-link">
                            <a href="#" onClick={this.logout}>Logout</a>
                        </li>
                    </ul>
                </div>
                <ul className="nav header-navbar-rht">
                    {/* <li className="nav-item contact-item">
                    <div className="header-contact-img">
                        <i className="far fa-hospital"></i>
                    </div>
                    <div className="header-contact-detail">
                        <p className="contact-header">Contact</p>
                        <p className="contact-info-header"> +1 315 369 5943</p>
                    </div>
                </li> */}
                    {/* <li className="nav-item">
                    <button className="nav-link header-login btn btn-outline-primary"  onClick={logout}>Logout</button>
                </li> */}
                    <li className="nav-item dropdown has-arrow logged-item">
                        <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false">
                            <span className="user-img">
                                <img className="rounded-circle" src={prod.baseurl+this.state?.user?.profile} width="31" alt="Darren Elder" />
                            </span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <div className="user-header">
                                <div className="avatar avatar-sm">
                                    <img src={prod.baseurl+this.state?.user?.profile} alt="User Image" className="avatar-img rounded-circle" />
                                </div>
                                <div className="user-text">
                                    <h6>{this.state?.user?.firstname} {this.state?.user?.lastname}</h6>
                                    <p className="text-muted mb-0">Doctor</p>
                                </div>
                            </div>
                            <a className="dropdown-item" href="/">Dashboard</a>
                            <a className="dropdown-item" href="/profile">Profile Settings</a>
                            <a className="dropdown-item"  onClick={this.logout}>Logout</a>
                        </div>
                    </li>
                </ul>
            </nav>
        </header>


        );
    }
}