import React, { Component } from 'react';
import { addToCart, removeFromCart } from "../../store/CartSlice";
import { connect } from "react-redux";
import "./cart.css";



const mapStateToProps = (state) => {
    return {
        itemsList: state.itemsList
    }
}

const mapDispatchToProps = {
    addToCart,
    removeFromCart
};

export class CartItem extends Component {

  render() {
      const {id,name, brand, totalDollarAmount,totalPoundAmount,totalYenAmount, attribute, attributeValue, quantity, image, poundAmount,poundCurrency, dollarAmount,dollarCurrency,yenAmount,yenCurrency } = this.props;

      const {state} = this.props;
      let postDollar = state.postDollar, postYen = state.postYen, postPounds = state.postPounds;


      this.incrementCartItems = () => {
          this.props.addToCart({
              name,
              id,
              brand,
              image,
              attributeValue,
              quantity
          })
      }

      this.decrementCartItems = () => {
          this.props.removeFromCart(id)
      }
    return (
        <>
            <div className="cart-main" key={`${id} ${attributeValue}`}>

                <div className="cart-submain">
                    <h3 className='item-brand'>  {brand}  </h3>
                    <h3 className='item-name'> {name} </h3>
                    {postDollar && (<h5>
                        {dollarCurrency} {dollarAmount?.toFixed(2)} </h5>)}

                    {postYen && (<h5>
                        {yenCurrency} {yenAmount?.toFixed(2)} </h5>)}

                    {postPounds && (<h5>
                        {poundCurrency} {poundAmount?.toFixed(2)} </h5>)}


                    {postDollar && (<h5 className='pdt-amount'>  {dollarCurrency}  {totalDollarAmount?.toFixed(2)} </h5>)}

                    {postPounds && (<h5 className='pdt-amount'>  {poundCurrency}  {totalPoundAmount?.toFixed(2)} </h5>)}

                    {postYen && (<h5 className='pdt-amount'>  {yenCurrency}  {totalYenAmount?.toFixed(2)} </h5>)}



                    <p> {attribute} </p>

                    {(attribute === 'Color') ?
                        (<p style={{ backgroundColor: attributeValue }} className='item-attr color'> </p>) :

                        (<p className='item-attr'>{attributeValue} </p>)
                    }

                </div>

                <div className="cart-submain2">
                    <div className="increment">
                        <button className="increase"
                            onClick={() => this.incrementCartItems()}
                        > + </button>
                        <p> {quantity} </p>
                        <button className="decrease"
                            onClick={() => this.decrementCartItems()}
                        > - </button>
                    </div>

                    <div className="product-image">
                        <img src={image} height={'100%'} width={'100%'} alt="" />
                    </div>
                </div>

            </div>

        </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
