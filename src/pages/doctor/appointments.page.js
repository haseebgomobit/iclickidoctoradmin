import '../../App.css';
import { render } from '@testing-library/react';
import { Component } from 'react';
import Cookie from 'js-cookie';
import swal from 'sweetalert';
import AppointmentCard from '../../components/appointments/appointment.component';
import { postRequest } from '../../helper/requests';
import AjaxLoaderIndicator from '../../components/general/loader.component';
export default class Appoinments extends Component {
    constructor(props) {
        super(props);
        this.state={appointments:[],show:true};
        this.onAccept=this.onAccept.bind(this);
        this.onCancel=this.onCancel.bind(this);
        this.onView=this.onView.bind(this);
        this.getAllAppointments=this.getAllAppointments.bind(this);
    }
    componentDidMount(){
        this.getAllAppointments();
        
    }
    getAllAppointments(){
        this.setState({appointments:[],show:true});
        postRequest("appointment/get-my-appointments",{}).then(data=>{
            this.setState({show:false});
            if(data.status===200){
                
                this.setState({appointments:data.data});
            }
        })
    }
    onAccept(e){
        this.setState({show:true});
        postRequest("appointment/aptmnt-respond",{aptId:e,status:1}).then(data=>{
            this.setState({show:false});
            if(data.status===200){
                this.getAllAppointments();
            }
            swal("Accepted successfully.");
        })

    }
    onCancel(e){
        this.setState({show:false});
        postRequest("appointment/aptmnt-respond",{aptId:e,status:2}).then(data=>{
            this.setState({show:false});
            if(data.status===200){
                this.getAllAppointments();
            }
            swal("Cancelled successfully.");
        })
    }
    onView(e){
        swal("Viewed");
    }

    
    render() {
        return (
            <div className="row">
                <div className="appointments w-100">
                {this.state.show  && <AjaxLoaderIndicator show={this.state.show}/>}
                    {
                        this.state.appointments.map((obj,key)=>{
                            return (
                                <>
                                
                                <AppointmentCard appointment={obj} key={key} onViewClick={this.onView} onAcceptClick={this.onAccept} onCancelClick={this.onCancel}/>
                                </>
                            );
                        })
                    }           
                </div>
            </div>
        );
    }
}