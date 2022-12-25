import { Component } from "react";


export default class NavButton extends Component {
    render() {

        const { icon, fontSize, border, color, backgroundColor } = this.props;
        return (
            <button
                type='button'
                style={{ color, fontSize, border, backgroundColor }}
            >
                <span
                    type='button'
                    style={{ backgroundColor }}
                />
                {icon}
            </button>
        );
    }
}