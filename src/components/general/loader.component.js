import { Component } from 'react';
export default class AjaxLoaderIndicator extends Component {
    constructor(props) {
        super(props);
        this.state={ show: this.props.show };
    }
    render() {
        return (
            <>
            <div className="loader-container">
                <div className="loader">
                    <img src="/assets/img/loader.gif" className="loader-img"/>
                    </div>
            </div>
         
            </>
        );
    }
}