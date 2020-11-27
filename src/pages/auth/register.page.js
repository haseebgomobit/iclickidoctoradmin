import {prod} from './../../config/index.json';
import swal from 'sweetalert';
import cookie from 'js-cookie';
import React from 'react';
import RegisterForm from '../../components/auth/register.form';
import AjaxLoaderIndicator from '../../components/general/loader.component';
export default class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {firstName:"",lastName:"",address:"",lat:0.0000,long:0.00,username: "", password: "" }
    }
    render = () => {
        return (
            <div className="row centered-login">
                <div className="col-sm-12 col-md-6 col-lg-4 login-right">
                    <div className="login-header">
                        <h3>Login <span>Doccure</span></h3>
                    </div>
                    
                   <RegisterForm history={this.props.history} />
                   
                </div>
            </div>
        );
    }
}