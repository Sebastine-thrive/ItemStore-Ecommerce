import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from "../../store/CartSlice";
import CartPageItem from './CartPageItem';
import './cartPage.css';


const mapStateToProps = (state) => {
    return {
        itemsQuantity: state.totalQuantity,
        itemsList: state.itemsList
    }
}

const mapDispatchToProps = {
    addToCart,
    removeFromCart,
};

export class CartPage extends Component {
   

    render() {
        const { state } = this.props;
        let postDollar = state.postDollar, postYen = state.postYen, postPounds = state.postPounds;

        let cartModalOpen = state.cartModalOpen

        let cartItems = this.props.itemsList;
        let itemsQuantity = this.props.itemsQuantity;

        let dollarTotal = 0, poundsTotal = 0, yenTotal = 0;
        cartItems.forEach((item) => {
            yenTotal += item.totalYenAmount;
            dollarTotal += item.totalDollarAmount;
            poundsTotal += item.totalPoundAmount;

        })

        let yenTax = 0.21 * yenTotal, dollarTax = 0.21 * dollarTotal, poundTax = 0.21 * poundsTotal

        let overallDollarTotal = yenTotal + yenTax, overallPoundsTotal = poundsTotal + poundTax, overallYenTotal = yenTotal + yenTax;


        return (
            <div className="cartpage-body" >
                <div className={cartModalOpen ? 'overlay' : null}></div>

                <h2> CART </h2>

                {cartItems.map((item, index) => (

                    <CartPageItem
                        key={index}
                        id={item.id}
                        name={item.name}
                        brand={item.brand}

                        poundCurrency={item.poundCurrency}
                        poundAmount={item.poundAmount}

                        dollarCurrency={item.dollarCurrency}
                        dollarAmount={item.dollarAmount}

                        yenCurrency={item.yenCurrency}
                        yenAmount={item.yenAmount}
                        state={state}
                        totalDollarAmount={item.totalDollarAmount}
                        totalYenAmount={item.totalYenAmount}
                        totalPoundAmount={item.totalPoundAmount}

                        attribute={item.attribute}
                        quantity={item.quantity}
                        image={item.imageSrc}
                        attributeValue={item?.attributeValue}
                        imageGallery={item.imageGallery}
                    />
                ))}


                <div className="cartpage-total">
                    <div><p> Total Before Tax </p>    {postDollar && (<p className='before-tax'> $ {dollarTotal.toFixed(2)} </p>)}

                        {postPounds && (<p className='before-tax'> £ {poundsTotal.toFixed(2)} </p>)}

                        {postYen && (<p className='before-tax'> ¥ {yenTotal.toFixed(2)} </p>)} </div>

                    {postPounds && (<div> <p> Tax 21%: </p> <p> £ {poundTax.toFixed(2)} </p> </div>)}
                    {postDollar && (<div> <p> Tax 21%: </p> <p> $ {dollarTax.toFixed(2)} </p> </div>)}
                    {postYen && (<div> <p> Tax 21%: </p> <p> ¥ {yenTax.toFixed(2)} </p> </div>)}

                    <div> <p> Quantity:  </p> <p> {itemsQuantity}</p>  </div>

                    <div><p> Total </p>    {postDollar && (<p className='overall-total'> $ {overallDollarTotal.toFixed(2)} </p>)}

                        {postPounds && (<p className='overall-total'> £ {overallPoundsTotal.toFixed(2)} </p>)}

                        {postYen && (<p className='overall-total'> ¥ {overallYenTotal.toFixed(2)} </p>)} </div>
                </div>

                <div className="cartpage-button">
                    <Link
                        to={"/checkout"}
                    >
                        <button className="cartpage-checkout">
                            CHECK OUT
                        </button>
                    </Link>
                </div>

            </div>

        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
