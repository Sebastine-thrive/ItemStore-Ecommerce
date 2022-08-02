import React, { Component } from "react";
import "./colorbox.css";

export default class Colourbox extends Component {

    render() {
        return (

            <div className="cart-color">
                <h4><strong> Color: </strong> </h4>

                <div className="box2">
                    <ul>
                        <li>
                            <input className="color-box-red" type="radio" id="red" name="color" value="red" />
                            <label htmlFor="red" />
                        </li>

                        <li>
                            <input className=" color-box-green" type="radio" id="green" name="color" value="green" />
                            <label htmlFor="green" />
                        </li>

                        <li>
                            <input className=" color-box-blue" type="radio" id="blue" name="color" value="blue" />
                            <label htmlFor="blue" />
                        </li>

                        <li>
                            <input className=" color-box-white" type="radio" id="white" name="color" value="white" />
                            <label htmlFor="white" />
                        </li>
                    </ul>

                </div>
            </div>
        )
    }
}