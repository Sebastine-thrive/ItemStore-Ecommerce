import React, { Component } from "react"
import "./miniCartStyles.css";
import { Link } from "react-router-dom";
import  Colourbox from "../color/Colorbox";
import Sizebox from "../size/Sizebox";



class MiniCart extends Component {

    render() {

        const { clear } = this.props;

        return (

            <div className="cart-body" id="cart-body">
                <h2>My Bag  3 Items </h2>

                <div className="cart-main">

                    <div className="cart-submain">
                        <h2> <strong> Product Brand </strong>  </h2>
                        <h3> Product Name</h3>
                        <h4> <strong> Price </strong> </h4>
                        <Sizebox />

                        <Colourbox />
                    </div>

                    <div className="cart-submain2">
                        <div className="increment">
                            <button className="increase"> + </button>
                            <button className="decrease"> - </button>
                        </div>

                        <div className="product-image">
                            <img src="https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/N/B/144458_1647450047.jpg" alt="" height={'90%'} width={'100%'} />
                        </div>
                    </div>

                </div>

                <div className="total">
                    <p> Total: </p>
                    <p> $300.00 </p>
                </div>


                <div className=" cart-button">
                    <Link to={"/cartPage"} onClick={clear} >
                        <button className="view-bag" id="view-bag">
                            VIEW BAG
                        </button>

                    </Link>

                    <Link to={"/checkout"} onClick={clear} >
                        <button className="checkout">
                            CHECK OUT
                        </button>
                    </Link>
                </div>

            </div>

        )

    }
}








export default MiniCart