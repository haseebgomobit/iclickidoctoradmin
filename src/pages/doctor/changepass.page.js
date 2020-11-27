
import '../../App.css';
import { Component } from 'react';
export default class ChangePassword extends Component {
 
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-12 col-lg-6">
                                    <form>
                                        <div className="form-group">
                                            <label>Old Password</label>
                                            <input type="password" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>New Password</label>
                                            <input type="password" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Confirm Password</label>
                                            <input type="password" className="form-control" />
                                        </div>
                                        <div className="submit-section">
                                            <button type="submit" className="btn btn-primary submit-btn">Save Changes</button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}