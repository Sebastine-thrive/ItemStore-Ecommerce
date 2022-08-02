import { Component } from "react";
import "./button.css";

export default class Button extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <button className="button">
                {this.props.children}
            </button>
        )

    }
}

