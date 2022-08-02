import React, { Component } from "react";
import MiniCart from "../miniCart/MiniCart";
import "./NavbarStyles.css";


export default class CartCard extends Component {
    constructor(props) {
        super(props);
        this.clear = this.clear.bind(this);
    }

    clear() {
        var cartcard = document.getElementById('cart-card')
        cartcard.classList.toggle("cartcard-clear");
    }

    render() {
        return (
            <div
                className="cart-card"
                id='cart-card'
                z-index="1000"
            >

                <MiniCart
                    className='cart'
                    clear={this.clear}
                />
            </div>
        )
    }
}

