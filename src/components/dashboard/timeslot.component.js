import { Component } from 'react';
export default class TimeSlotComponent extends Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        return (<div className="doc-slot-list">
            {this.props.start} - {this.props.end}
        </div>);
    }
}