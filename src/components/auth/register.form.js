import React, { Component } from 'react';
import swal from 'sweetalert';
import { postFormDataRequest as fdReqPost, postRequest } from './../../helper/requests';
import { langs as lang } from './../../helper/langs.json';
import 'react-phone-number-input/style.css'
import { isValidPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input'
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';
import AjaxLoaderIndicator from '../general/loader.component';
export default class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {show:false, selectedFile: "", alllang: [], pending: false, userexists: false, query: "", file: null, firstName: "", lastName: "", address: "", lat: 0.0000, long: 0.00, username: "", password: "", code: "", number: "", email: "", lanuage: "en", phone: "" }
        this.autoComplete = null;
        this.setState({ alllang: lang });
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSelect=this.handleSelect.bind(this);
        this.file = null;
    }
    componentDidMount() {

        this.loadScript("/assets/js/script.js", () => { });
        console.log(this.props.history);
    }
    async handlePlaceSelect(updateQuery) {
        const addressObject = this.autoComplete.getPlace();
        const query = addressObject.formatted_address;
        updateQuery({ query: query });
        console.log(addressObject);
    }
    
    loadScript = (url, callback) => {
        let script = document.createElement("script"); // create script tag
        script.type = "text/javascript";

        // when script state is ready and loaded or complete we will call callback
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = () => callback();
        }

        script.src = url; // load by url
        document.getElementsByTagName("head")[0].appendChild(script); // append to head
    };
    async handleSubmit(event) {

        event.preventDefault();
        if(!(this.state.code&&this.state.number)){
            swal("Provide number. Example: +122223121");
            return;
        }
        const formData = new FormData();
        formData.append("firstname", this.state.firstName);
        formData.append("lastname", this.state.lastName);
        formData.append("address", this.state.address);
        formData.append("lat", this.state.lat);
        formData.append("long", this.state.long);
        formData.append("code", this.state.code);
        formData.append("number", this.state.number);
        formData.append("username", this.state.username);
        formData.append("password", this.state.password);
        formData.append("file", this.state.file);
        formData.append("email", this.state.email);
        this.setState({show:true});
        const result = await fdReqPost('/doctor/create', formData, false);
        if (result.status === 200) {
            swal("Account created.");
            this.props.history.push('/created')
            //window.location.href="/created";
        } else {
            swal(result.message);
        }
        this.setState({show:false});

    }
    handleFirstNameChange = (e) => {
        this.setState({ firstName: e.target.value });
    }
    handleLastChange = (e) => {
        this.setState({ lastName: e.target.value });
    }
    handleAddressChange = (e) => {
        this.setState({ address: e.target.value });
    }
    handleLanguageChange = (e) => {
        this.setState({ lanuage: e.target.value });
    }
    handlePhoneChange = (e) => {
        this.setState({ code: "", number: "" });
        const isValid = isValidPhoneNumber(e.target.value);
        if (isValid) {
            const formated = formatPhoneNumberIntl(e.target.value);
            let code = formated.split(' ')[0];
            var number = formated.replace(code, "");
            if (code.indexOf("+") > 0) code = code.replace("+", "");
            this.setState({ code: code, number: number });
        }
        this.setState({ phone: e.target.value });
    }
    handleUsernameChange = async (e) => {
        this.setState({ userexists: false, pending: true });
        this.setState({ username: e.target.value });
        const result = await postRequest("/doctor/check-username", { username: e.target.value }, false);
        this.setState({ pending: false });
        if (result.status === 200) {
            this.setState({ userexists: true });
        } else {
            this.setState({ userexists: false });
        }
    }
    handlePassworddChange = (e) => {
        this.setState({ password: e.target.value });
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }
 
    toBase64123(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    }
    async handleFileChange(e) {
        this.setState({ file: e.target.files[0] });
        const url = await this.toBase64123(e.target.files[0]);
        this.setState({ selectedFile: url });
    }
    handleChange = address => {
        this.setState({ address:address });
    };

    handleSelect = address => {
        this.setState({ address:address });
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng =>{
                this.setState({lat:latLng.lat,long:latLng.lng})
            })
            .catch(error => console.error('Error', error));
    };
    render() {
        return (<form onSubmit={this.handleSubmit} autocomplete="off">
                    
                    {this.state.show  && <AjaxLoaderIndicator show={this.state.show}/>}
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group form-focus">
                        <input type="text" className="form-control floating" value={this.state.firstName} onChange={this.handleFirstNameChange} required />
                        <label className="focus-label" >First name</label>
                    </div>

                </div>
                <div className="col-md-6">
                    <div className="form-group form-focus">
                        <input type="text" className="form-control floating" value={this.state.lastName} onChange={this.handleLastChange} required />
                        <label className="focus-label">Last name</label>
                    </div>
                </div>
            </div>
            <div>
                 </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="form-group form-focus">
                        <input type="text" className="form-control floating" value={this.state.phone} onChange={this.handlePhoneChange} required />
                        {this.state.code}{this.state.number}
                        <label className="focus-label">Phone number</label>
                    </div>

                </div>
                <div className="col-md-6">
                    <div className="form-group form-focus">
                        {/* <input type="text" className="form-control floating" value={this.state.address} onChange={this.handleAddressChange} required /> */}
                        <select className="form-control floating" value={this.state.lanuage} onChange={this.handleLanguageChange} required>
                            {
                                lang.map((e, i) => {
                                    return (<option key={i} value={e.code}>{e.name}</option>)
                                })
                            }
                        </select>
                        <label className="focus-label">Language</label>
                    </div>
                </div>
            </div>

            <div className="form-group form-focus">
                <input type="email" className="form-control floating" value={this.state.email} onChange={this.handleEmailChange} required />
                <label className="focus-label">Email</label>
            </div>
            <div className="form-group form-focus">
            <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                    className="form-control floating" 

                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input
                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'location-search-input',
                                })}
                                className="form-control floating" 
                            />
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'list-group-item'
                                        : 'list-group-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
           
                {/* <input type="text" className="form-control floating" value={this.state.address} onChange={this.handleAddressChange} required /> */}
                <label className="focus-label">Address</label>
            </div>
            <div className="row">
                <div className="col-md-8">
                    <div className="form-group form-focus">
                        <input type="file" className="form-control floating" placeholder="Select profile image" onChange={this.handleFileChange} required style={{ padding: "10px", overflow: "hidden" }} accept="image/*" />
                        {/* <label className="focus-label">Image profile</label> */}
                    </div>

                </div>
                <div className="col-md-4">
                    <img src={this.state.selectedFile} style={{ width: "100%", height: "50px" }} />
                </div>
            </div>

            <div className="form-group form-focus">
                <input type="text" autoComplete={false} className="form-control floating" value={this.state.username}  onChange={this.handleUsernameChange} required />
                <label className="focus-label">Username</label>
                {
                    this.state.userexists &&
                    <span style={{ position: "absolute", zIndex: 10 }} className="alert alert-danger alert-dismissible fade show">Username taken</span>
                }
            </div>
            <div className="form-group form-focus">
                <input type="password" className="form-control floating" value={this.state.password} onChange={this.handlePassworddChange} required />
                <label className="focus-label">Password</label>
            </div>
            {
                (this.state.pending || this.state.userexists) &&
                <button className="btn btn-primary btn-block btn-lg login-btn" disabled>Register</button>
            }
            {
                !(this.state.pending || this.state.userexists) &&
                <button className="btn btn-primary btn-block btn-lg login-btn" type="submit">Register</button>
            }
            <div className="login-or">
                <span className="or-line"></span>
                <span className="span-or">or</span>
            </div>
            <div className="text-center dont-have">Already have an account? <a href="/auth/login">Login</a></div>

        </form>);
    }
}