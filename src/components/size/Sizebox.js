import React, { Component } from "react";
import "./sizebox.css";

export default class Sizebox extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { sizeDescription } = this.props;

        return (

            <div className="cart-size">
                {/* <h4> <strong>  {sizeDescription.name}</strong> </h4> */}
                <div className="box">
                    <ul>
                        <li>
                            <input className="size-box" type="radio" id="XS" name="size" value="xs" />
                            <label htmlFor="XS"> XS</label>
                        </li>

                        <li>
                            <input className="size-box" type="radio" id="S" name="size" value="s" />
                            <label htmlFor="S"> S</label>
                        </li>

                        <li>
                            <input className="size-box" type="radio" id="M" name="size" value="m" />
                            <label htmlFor="M" > M</label>
                        </li>

                        <li>
                            <input className="size-box" type="radio" id="L" name="size" value="l" />
                            <label htmlFor="L"> L</label>
                        </li>
                    </ul>

                </div>
            </div>
        )
    }
}

