import React, { Component } from 'react';
import CartItem from './CartItem';
import { connect } from "react-redux";

import { Link } from 'react-router-dom';

import './cart.css';


const mapStateToProps = (state) => {
  return {
    quantity: state.totalQuantity,
    itemsList: state.itemsList
  }
}

class Cart extends Component {

  render() {

  const {updateState} = this.props;
    let overallDollarTotal = 0, overallPoundsTotal = 0, overallYenTotal = 0;

    let cartItems = this.props.itemsList;
    // console.log(cartItems)

    cartItems.forEach((item) => {
      overallYenTotal += item.totalYenAmount;
      overallDollarTotal += item.totalDollarAmount;
      overallPoundsTotal += item.totalPoundAmount;
    })

    let itemsQuantity = this.props.quantity;
    let state = this.props.state;

    // let cartModalOpen = state.cartModalOpen;
    let postDollar = state.postDollar, postYen = state.postYen, postPounds = state.postPounds;

    return (

      <div className="cart-body" >
        <div className='headung'>
          <h2>My Bag  <span className='item-quantity'>
            {itemsQuantity === 0 && 'is empty'}
            {itemsQuantity === 1 && itemsQuantity + ' Item'}
            {itemsQuantity > 1 && itemsQuantity + ' Items'}

          </span>  </h2>
        </div>

        {cartItems?.map((item) => (
          <li key={`${item.id}`}
          >
            <CartItem
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

            // priceCurrency={priceCurrency}
            />
          </li>
        )
        )}

        <div className='cart-footer'>
          <div className="total">
            <p> Total: </p>
            {postDollar && (<p className='overall-price'> $ {overallDollarTotal.toFixed(2)} </p>)}

            {postPounds && (<p className='overall-price'> £ {overallPoundsTotal.toFixed(2)} </p>)}

            {postYen && (<p className='overall-price'> ¥ {overallYenTotal.toFixed(2)} </p>)}


          </div>

          <div className={itemsQuantity === 0 ? "hidden" : "cart-button"}>
            <Link
              to={"/cartpage"} >
              <button className="view-bag" onClick={() => updateState({ ...this.props.state, cartModalOpen: false })}>
                VIEW BAG
              </button>
            </Link>

            <Link
              to={"/checkout"}
            >
              <button className="checkout">
                CHECK OUT
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(mapStateToProps)(Cart);
