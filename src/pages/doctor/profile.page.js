
import '../../App.css';
import { render } from '@testing-library/react';
import { Component } from 'react';
import cookie from 'js-cookie';
import {prod} from './../../config/index.json';
import { postRequest,getRequest } from '../../helper/requests';
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state={user:JSON.parse(cookie.get("auth")),specialities:[]}
        console.log(this.state.user);
        
    }
    componentDidMount(){
      this.getAllSpecialities();
    }
    getAllSpecialities(){
        getRequest('doctor/get-specialities',false).then(x=>{
            this.setState({specialities:x.data});
            console.log(this.state.specialities);
        })
    }
    render() {
        return (

            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Basic Information</h4>
                            <div className="row form-row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <div className="change-avatar">
                                            <div className="profile-img">
                                                <img src={prod.baseurl+this.state.user.profile} alt="User Image" />
                                            </div>
                                            <div className="upload-img">
                                                <div className="change-photo-btn">
                                                    <span><i className="fa fa-upload"></i> Upload Photo</span>
                                                    <input type="file" className="upload" />
                                                </div>
                                                <small className="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Username <span className="text-danger">*</span></label>                                        
                                        <input type="text" className="form-control" disabled value={this.state.user?.username}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Email <span className="text-danger">*</span></label>
                                        <input type="email" className="form-control" disabled value={this.state.user?.email}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>First Name <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control"value={this.state.user?.firstname} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Last Name <span className="text-danger">*</span></label>
                                        <input type="text" className="form-control" value={this.state.user?.lastname}/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input type="text" className="form-control" value={(this.state.user?.code ?this.state.user?.code:'') +' '+(this.state.user?.number ?this.state.user?.number:'') }/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <select className="form-control">
                                            <option data-select2-id="3">Select</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Speciality</label>
                                        <select className="form-control" required value={this.state.user.speciality}>
                                            <option value="">Select</option>
                                            {
                                                this.state.specialities.map((e,k)=>{
                                                    return(<option value={e.id}>{e.displayname}</option>)
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}