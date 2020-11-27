
import chroma from "chroma-js";
import Select from "react-select";
import { Component } from 'react';
import Cookie from 'js-cookie';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import { prod } from './../../config/index.json'

import '../../App.css';
import TimeSlotComponent from '../../components/dashboard/timeslot.component';
import Modal from 'react-modal';
import cookie from 'js-cookie';
import TimeSlotModalComponent from "../../components/dashboard/timeslotmodal.component";
import moment from 'moment';
import AjaxLoaderIndicator from "../../components/general/loader.component";
export default class Scheduler extends Component {
    constructor(props) {
        super(props);
        this.slotoptions = [
            { value: 15, label: '15 Mins', color: "#0de0fe" },
            { value: 30, label: '30 Mins', color: "#0de0fe" },
            { value: 45, label: '45 Mins', color: "#0de0fe" },
            { value: 60, label: '60 Mins', color: "#0de0fe" }
        ];

        this.state = {
            show: false,
            dateSelected: this.state?.dateSelected ? this.state?.dateSelected : new Date(),
            modalIsOpen: false,
            timeslots: []
        }
        this.closeModal = this.closeModal.bind(this);
        this.renderSlots = this.renderSlots.bind(this);
    }
    componentDidMount() {
        this.getSlots();
        ///this.setState({ timeslots: [] })
    }
    colourStyles = {
        control: (styles) => ({ ...styles, backgroundColor: "white" }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? null
                    : isSelected
                        ? data.color
                        : isFocused
                            ? color.alpha(0.1).css()
                            : null,
                color: isDisabled
                    ? "#ccc"
                    : isSelected
                        ? chroma.contrast(color, "white") > 2
                            ? "white"
                            : "black"
                        : data.color,
                cursor: isDisabled ? "not-allowed" : "default",

                ":active": {
                    ...styles[":active"],
                    backgroundColor:
                        !isDisabled && (isSelected ? data.color : color.alpha(0.3).css())
                }
            };
        },
        input: (styles) => ({ ...styles }),
        placeholder: (styles) => ({ ...styles }),
        singleValue: (styles, { data }) => ({ ...styles })
    };

    getSlots() {
        this.setState({ show: true })
        var token = JSON.parse(cookie.get("auth")).token;
        fetch(prod.apibaseurl + "appointment/view-slots", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': token
            }
        }).then(x => x.json()).then(x => {
            this.setState({ show: false })
            if (x.status === 200) {
                this.setState({ timeslots: x.data })
            }
        }).catch(x => {
            this.setState({ show: false })
        })
    }
    openModal() {
        this.setState({ modalIsOpen: true });
    }
    getSelectedSlots() {
        if (this.state.timeslots?.length > 0) {
            let selectedTimeSlots = this.state.timeslots.filter(x => new Date(x.date).toDateString() === this.state.dateSelected.toDateString());
            return selectedTimeSlots;
        }
        return [];
    }
    renderSlots() {
        let arr = [];

        let selectedTimeSlots = this.getSelectedSlots();
        for (let i = 0; i < selectedTimeSlots[0]?.slots.length; i++) {
            arr.push(<TimeSlotComponent key={i} start={moment(selectedTimeSlots[0]?.slots[i]?.start).format("hh:mm a")} end={moment(selectedTimeSlots[0]?.slots[i]?.end).format("hh:mm a")} />)
        }
        return arr;
    }


    closeModal() {
        this.setState({ modalIsOpen: false });
        this.getSlots();
    }
    setDate(date) {
        this.setState({ dateSelected: date });
        this.renderSlots();
    }
    render() {
        return (

            <div className="row">
                {this.state.show && <AjaxLoaderIndicator show={this.state.show} />}
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Schedule Timings</h4>
                            <div className="profile-box">
                                {/* <div className="row">

                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label>Timing Slot Duration</label>
                                            <Select styles={{ zIndex: 1050 }}
                                                defaultValue={this.slotoptions[0]}
                                                options={this.slotoptions}
                                                styles={this.colourStyles}
                                            />
                                        </div>
                                    </div>

                                </div> */}
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card schedule-widget mb-0">
                                            <div className="schedule-header">
                                                <div className="schedule-nav">

                                                    <div className="row">
                                                        <InfiniteCalendar
                                                            style={{ position: 'relative', zIndex: '1' }}
                                                            onSelect={this.setDate.bind(this)}
                                                            minDate={new Date()}
                                                            displayOptions={{
                                                                layout: 'landscape'
                                                            }}
                                                            selected={this.state?.dateSelected}
                                                            className="col-12" height={300}
                                                            theme={
                                                                {
                                                                    zIndex: 0,
                                                                    selectionColor: '#008ca0',
                                                                    textColor: {
                                                                        default: '#0de0fe',
                                                                        active: '#FFF'
                                                                    },
                                                                    weekdayColor: '#17a2b8',
                                                                    headerColor: '#007b8e',
                                                                    floatingNav: {
                                                                        background: '#008ca0',
                                                                        color: '#FFF',
                                                                        chevron: '#FFA726'
                                                                    }
                                                                }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-content schedule-cont">
                                                <div id="slot_sunday" className="tab-pane fade">
                                                    <h4 className="card-title d-flex justify-content-between">
                                                        <span>Time Slots</span>
                                                        <a className="edit-link" data-toggle="modal" href="#add_time_slot"><i className="fa fa-plus-circle"></i> Add Slot</a>
                                                    </h4>
                                                    <p className="text-muted mb-0">Not Available</p>
                                                </div>
                                                <div id="slot_monday" className="tab-pane fade show active">
                                                    <h4 className="card-title d-flex justify-content-between">
                                                        <span>Time Slots</span>
                                                        <a className="edit-link" onClick={this.openModal.bind(this)}><i className="fa fa-edit mr-1"  ></i>Edit</a>
                                                    </h4>
                                                    <div className="doc-times">
                                                        {
                                                            this.getSelectedSlots()[0]?.slots.length > 0 &&
                                                            this.renderSlots()
                                                        }
                                                        {
                                                            !(this.getSelectedSlots()[0]?.slots.length > 0) &&
                                                            <div>No slot here</div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal.bind(this)}
                    contentLabel="Example Modal"
                    style={{
                        content: {
                            maxHeight: "fit-content",
                            maxWidth: "100%",
                            minWidth: "500px",
                            width: "fit-content",
                            padding: 0

                        }
                    }}
                    className="fadeIn"
                >
                    <TimeSlotModalComponent timeslots={this.state.timeslots} dateSelected={this.state.dateSelected} onClose={this.closeModal} />


                </Modal>
            </div>
        );
    }
}