import { Component } from 'react';
import { TimePicker } from "baseui/timepicker";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { LightTheme, ThemeProvider } from "baseui";
import { SIZE } from 'baseui/input';
import cookie  from 'js-cookie';
import {prod} from './../../config/index.json'
import swal from 'sweetalert';
import moment from 'moment';
export default class TimeSlotModalComponent extends Component {
    constructor(props) {
        super(props);
        this.state={timeslots:[]}
        
        this.engine = new Styletron();
        this.formSubmit = this.formSubmit.bind(this);
        this.addNewSlot = this.addNewSlot.bind(this);
        this.removeSlot = this.removeSlot.bind(this);
    }
    getSelectedSlots() {
        let selectedTimeSlots =this.props.timeslots.filter(x => new Date(x.date).toDateString() === this.props.dateSelected.toDateString());
        return selectedTimeSlots;
    }
    componentDidMount(){
        this.setState({ timeslots:this.getSelectedSlots()});
    }
    removeSlot(e) {
        let selectedTimeSlots = this.state.timeslots[0];
        selectedTimeSlots?.slots?.splice(e, 1);
        this.setState({timeslots:[selectedTimeSlots]});
    }
    handleTimeSlotChange(e,i,t){
        let selectedTimeSlots = this.state.timeslots[0];
        if(t===0){
            selectedTimeSlots.slots[i].start=e;
        }
        if(t===1){
            selectedTimeSlots.slots[i].end=e;
        }
        this.setState({timeslots:[selectedTimeSlots]});
    }
  
    formSubmit(e) {
        e.preventDefault();
        var data=[];
        this.state.timeslots.forEach(e=>{
            let pobject = {
                date: moment(new Date(e.date)).format("YYYY-MM-DDThh:mm:ss"),
                slots:[]
            }
            e.slots.forEach(ea=>{
                pobject.slots.push({
                    startTime:ea.start,
                    endTime:ea.end
                })
            })
            data.push(pobject);
        })
        
        var token=JSON.parse(cookie.get("auth")).token;
        var req={
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization':token
            }            
        }
        fetch(prod.apibaseurl+"appointment/create",req).then(d=>d.json()).then(z=>{
            if(z.status!==200){
                swal(z.message);
                this.props.onClose();
            }else{
            swal(z.message);
                this.props.onClose();
            }
        })
    }
    addNewSlot(e) {
        let selectedTimeSlots = this.state.timeslots[0];
        if(!selectedTimeSlots) selectedTimeSlots={date:this.props.dateSelected,slots:[]};
        selectedTimeSlots?.slots?.push(
            {
                start: this.props.dateSelected,
                end: this.props.dateSelected
            });
        this.setState({timeslots:[selectedTimeSlots]});
    }
    render() {
        return (<div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Edit Time Slots</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" onClick={() => { this.props.onClose() }}>×</span>
                </button>
            </div>
            <div class="modal-body">
                <form onSubmit={this.formSubmit}>
                    <div class="hours-info">
                        {this.state.timeslots[0]?.slots.map((obj,key)=>{
                            return(<StyletronProvider value={this.engine} key={key}>
                                <ThemeProvider theme={LightTheme}>
                                    <div class="row form-row hours-cont">
                                        <div class="col-12 col-md-10">
                                            <div class="row form-row">
                                                <div class="col-12 col-md-6">
                                                    <div class="form-group">
                                                        <label>Start Time</label>
                                                        <TimePicker
                                                            value={new Date(obj?.start)}
                                                            size={SIZE.compact}
                                                            creatable
                                                            placeholder="Select please"
                                                            onChange={evt=>this.handleTimeSlotChange(evt,key,0)}
                                                        />
                                                    </div>
                                                </div>
                                                <div class="col-12 col-md-6">
                                                    <div class="form-group">
                                                        <label>End Time</label>
                                                        <TimePicker
                                                            value={new Date(obj?.end)}
                                                            size={SIZE.compact}
                                                            creatable
                                                            step={900}
                                                            placeholder="Select please"
                                                            onChange={evt=>this.handleTimeSlotChange(evt,key,1)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 col-md-2">
                                            <label class="d-md-block d-sm-none d-none">&nbsp;</label><a onClick={() => { this.removeSlot(key) }}  class="btn btn-danger trash"><i class="far fa-trash-alt"></i></a></div>
                                    </div>
                                </ThemeProvider>
                            </StyletronProvider>)
                        })}
                    </div>

                    <div class="add-more mb-3">
                        <a  class="add-hours" onClick={this.addNewSlot.bind(this)}><i class="fa fa-plus-circle"></i> Add new slot</a>
                    </div>
                    <div class="submit-section text-center">
                        <button type="submit" class="btn btn-primary submit-btn">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>);
    }
}