import {prod} from './../../config/index.json';
import swal from 'sweetalert';
import cookie from 'js-cookie';
import React from 'react';
import AjaxLoaderIndicator from '../../components/general/loader.component';
import { Link } from 'react-router-dom';
export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "",show:false }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePassworddChange = this.handlePassworddChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }
    handlePassworddChange(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        this.setState({show:true})
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };
        fetch(prod.apibaseurl+"doctor/login", requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({show:false})
                if(data.status===200){
                    cookie.set("auth", data.data);
                    this.props.history.push("/");
                }else{
                    swal("Error!", "Error loging!", "error");
                }
            }).catch(e=>{
                this.setState({show:false})
                alert(JSON.stringify(e));
            });
        event.preventDefault();
    }
    render = () => {
        return (
            <div className="row centered-login">
             {this.state.show  && <AjaxLoaderIndicator show={this.state.show}/>}
                <div className="col-sm-12 col-md-6 col-lg-4 login-right">
                    <div className="login-header">
                        <h3>Login <span>Doccure</span></h3>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group form-focus">
                            <input type="text" className="form-control floating" value={this.state.username} onChange={this.handleUsernameChange}/>
                            <label className="focus-label">Username</label>
                        </div>
                        <div className="form-group form-focus">
                            <input type="password" className="form-control floating" value={this.state.password} onChange={this.handlePassworddChange}/>
                            <label className="focus-label">Password</label>
                        </div>
                        <div className="text-right">
                            <a className="forgot-link" href="forgot-password.html">Forgot Password ?</a>
                        </div>
                        <button className="btn btn-primary btn-block btn-lg login-btn" type="submit">Login</button>
                        <div className="login-or">
                            <span className="or-line"></span>
                            <span className="span-or">or</span>
                        </div>
                        <div className="text-center dont-have">Don’t have an account? 
                        <Link to="/auth/register">Register</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}