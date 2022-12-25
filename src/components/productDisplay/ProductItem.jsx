import React, { Component } from 'react';
import './productDisplay.css';

import { connect } from "react-redux";
import { addToCart } from "../../store/Cart-slice";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';



const mapStateToProps = (state) => {
    return {
        quantity: state.totalQuantity,
        itemsList: state.itemsList
    }
}

const mapDispatchToProps = {
    addToCart
};

 class ProductItem extends Component {

    render() {

        const { id, name, brand, mainImage, cartModalOpen, dollarCurrency, dollarAmount, poundCurrency, poundAmount, yenCurrency, yenAmount, length } = this.props;
        const { updateState } = this.props;
        const { state } = this.props

        let postDollar = state.postDollar, postPounds = state.postPounds, postYen = state.postYen;


        this.addItemToCart = () => {
            this.props.addToCart({
                name,
                id: id,
                brand,
                image: mainImage,

                yenCurrency: yenCurrency,
                dollarCurrency: dollarCurrency,
                poundCurrency: poundCurrency,

                yenAmount: yenAmount,
                dollarAmount: dollarAmount,
                poundAmount: poundAmount,
            })
        }


        this.notify = () => {
            toast('item Added Successfully!');
        }

        this.cartAddition = () => {
            this.addItemToCart();
            this.notify();
        }

        return (
            <>
                <div key={id} className="productcard">
                    <div className={cartModalOpen ? 'overlay' : null}></div>

                    <div className="productcard-img-container">

                        <img src={mainImage} alt="" />
                    </div>

                    <div className="productcard-info">
                        <p> {brand} {name} </p>

                        {postYen && (<p> {yenCurrency} {yenAmount}  </p>)}
                        {postDollar && (<p> {dollarCurrency} {dollarAmount}  </p>)}
                        {postPounds && (<p>  {poundCurrency} {poundAmount}  </p>)}

                    </div>

                    <div className="postcard-footer">
                        {(length > 0) ? (

                            <Link
                                to={`/product/${id}`}
                            >
                                <button
                                    onClick={() => updateState({ ...this.props.state, selectedId: id })}


                                    className='productcard-button'>
                                    DETAILS
                                </button>

                            </Link>
                        ) : (

                            <button
                                className='add-to-cart-button2'
                            onClick={() => this.cartAddition()}
                            >
                                ADD TO CART
                            </button>

                        )
                        }
                        <ToastContainer
                            position="bottom-center"
                            autoClose={1000}
                        />
                    </div>

                </div>
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);