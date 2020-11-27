import { Component } from 'react';
export default class GenericForm extends Component {
    constructor(props) {
        super(props);
        this.state={ props: this.props.elements };
        console.log(Object.keys(this.state.props));
    }
    handleInputChange(e,i,t){
        this.state.props[i]=e.target.value;
        this.setState({props:this.state.props});
    }
    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                    {Object.keys(this.state.props).map((key, e) => {
                        // if (e.type == "textbox") {
                        return (
                            <div className="form-group form-focus" key={key}>
                                <input type="text" className="form-control floating" value={this.state.props[key]} onChange={evt=>this.handleInputChange(evt,key)} />
                                <label className="focus-label">{key}</label>
                            </div>);
                        // }
                        })
                    }
            </form>

        );
    }
}