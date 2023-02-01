import React, { Component } from 'react';
import ProductItem from './ProductItem';
import './productDisplay.css';


export class ProductDisplay extends Component {

  render() {
    const { products, cartModalOpen, selectedId } = this.props;
    const { updateState } = this.props;
    const {state} = this.props;


    return (
      <>
        <div className="product-body">
          {
            products.map((product) => {

              let dollarCurrency = product?.prices[0]?.currency?.symbol, dollarAmount = product?.prices[0]?.amount;
              let poundCurrency = product?.prices[1]?.currency?.symbol, poundAmount = product?.prices[1]?.amount;
              let yenCurrency = product?.prices[3]?.currency?.symbol, yenAmount = product?.prices[3]?.amount;
              let yenPrice = yenCurrency + ' ' + yenAmount, dollarPrice = dollarCurrency + ' ' + dollarAmount, poundPrice = poundCurrency + ' ' + poundAmount
              let length = product.attributes.length;

              return (

                <ProductItem key={product.id}
                  id={product.id}
                  name={product.name}
                  brand={product.brand}
                  yenPrice={yenPrice}
                  yenCurrency={yenCurrency}
                  yenAmount={yenAmount}

                  dollarPrice={dollarPrice}
                  dollarCurrency={dollarCurrency}
                  dollarAmount={dollarAmount}

                  poundPrice={poundPrice}
                  poundCurrency={poundCurrency}
                  poundAmount={poundAmount}

                  mainImage={product.gallery[0]}
                  selectedId={selectedId}
                  cartModalOpen={cartModalOpen}
                  length={length}
                  updateState={updateState}
                  state={state}
                />
              )
            })
          }
        </div >
      </>
    )
  }
}
export default ProductDisplay