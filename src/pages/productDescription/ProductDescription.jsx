import React, { Component } from "react";
import { onError } from "@apollo/client/link/error";
import { GET_ITEM_DETAILS } from "../../components/graphQl/Queries";
import { InMemoryCache, ApolloClient, HttpLink, from } from "@apollo/client";
import './ProductDescription.css';

import Loading from "../../components/loading/Loading";
import DOMPurify from 'dompurify';
import { connect } from "react-redux";
import { addToCart } from "../../store/Cart-slice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Link } from "react-router-dom";



const mapStateToProps = (state) => {
    return {
        quantity: state.totalQuantity,
        itemsList: state.itemsList
    }
}

const mapDispatchToProps = {
    addToCart
};

class ProductDescription extends Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(window.localStorage.getItem('state')) ||
        {
            singleItemDetails: {},
            selectedAttr: null
        }


        const errorLink = onError(({ graphqlErrors, networkError }) => {
            if (graphqlErrors) {
                graphqlErrors.map(({ message, location, path }) => {
                    return (`Graphql error ${message} at ${location}. Take a look at ${path}`);
                });
            }

            if (networkError) {
                console.log('Network error: Check host connection');
            }
        });

        const link = from([
            errorLink,
            new HttpLink({
                uri: "http://localhost:4000/"
            }),
        ]);

        this.client = new ApolloClient({
            cache: new InMemoryCache(),
            link
            // uri: "http://localhost:4000/" 
        });
    }

    onChangeValue = (e) => {
        this.setState({ ...this.state, selectedAttr: e.target.value })
    }

    componentDidMount() {
        this.client.query({
            query: GET_ITEM_DETAILS,
            variables: { id: this.props.selectedId }
        })
            .then(singleProductData => {
                this.setState({ singleItemDetails: singleProductData })
            })
    }

    componentDidUpdate(prevsProps, prevState) {
        if (prevsProps.selectedId !== this.props.selectedId) {
            this.client.query({
                query: GET_ITEM_DETAILS,
                variables: { id: this.props.selectedId }
            })
                .then(singleProductData => {
                    this.setState({ singleItemDetails: singleProductData })
                })
        }
    }

    render() {


        const { singleItemDetails } = this.state;

        const { selectedId } = this.props;

        let state = this.props.state;

        let cartModalOpen = state.cartModalOpen;

        let postDollar = state.postDollar, postYen = state.postYen, postPounds = state.postPounds;


        if (singleItemDetails?.data === undefined)
            return <Loading />

        if (singleItemDetails.loading)
            return <Loading />



        const singleItem = singleItemDetails?.data?.product, attributeItem = singleItem?.attributes[0]?.items;
        // console.log(attributeItem);
        let selectedAttr = this.state.selectedAttr, lastAttribute = attributeItem[attributeItem.length - 1].value, attribute = singleItem?.attributes[0];

        let gallery = singleItem?.gallery, mainImageSource = singleItem?.gallery[0];

        let description = singleItem?.description;

        let price = singleItem?.prices, dollarCurrency = price[0]?.currency?.symbol, dollarAmount = price[0]?.amount, dollarPrice = dollarCurrency + ' ' + dollarAmount

        let poundCurrency = price[1].currency?.symbol, poundAmount = price[1]?.amount, poundPrice = poundCurrency + ' ' + poundAmount;

        let yenCurrency = price[3].currency?.symbol, yenAmount = price[3]?.amount, yenPrice = yenCurrency + ' ' + yenAmount;


        this.addItemToCart = () => {
            this.props.addToCart({
                name: singleItem.name,
                id: selectedId + (selectedAttr || lastAttribute),
                brand: singleItem.brand,
                image: mainImageSource,
                imageGallery: gallery,
                attributeValue: selectedAttr || lastAttribute || null,
                attribute: attribute?.name || null,

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
            <div className="pdt-desc-body">
                <div className={cartModalOpen ? 'overlay' : null}></div>
                <div className="pdt-desc-main">

                    <div className="pdt-desc-submain">
                        <div className="pdt-desc-thumbnails">
                            {gallery?.map((image, index) => (
                                <img className='small-image' key={index} src={image} alt="" height={'80%'} width={'60%'} />
                            ))}

                        </div>

                        <div className="pdt-desc-image">
                            <img src={mainImageSource} alt=""
                                height={'100%'} width={'100%'} className="large-image"
                            />
                        </div>
                    </div>


                    <div className="pdt-desc-submain2">
                        <div className="pdt-desc-name">
                            <h3> {singleItem?.brand} </h3>
                            <h4> {singleItem?.name}</h4>
                        </div>

                        <div>
                            <h4 className='pdt-attr'> <strong>  {attribute?.name}:</strong> </h4>

                            <div className="pdt-desc-attr">

                                {(attribute && attribute?.type === 'text') ? (
                                    attributeItem.map((item, index) => (

                                        <div className="box" key={index}
                                        >
                                            <ul
                                            >
                                                <li>
                                                    <input className="text-box" type="radio"
                                                        id={item?.id}
                                                        name={attribute?.name}
                                                        value={item?.value}
                                                        onFocus={this.onChangeValue}

                                                        defaultChecked
                                                    />
                                                    <label htmlFor={item?.value} > {item?.value}</label>
                                                </li>
                                            </ul>
                                        </div>
                                    ))
                                ) : (null)
                                }

                                {(attribute && attribute?.type === 'swatch') ? (
                                    attributeItem.map((piece, index) => (

                                        <div className="box" key={index}
                                        // onChange={onChangeValue}
                                        >
                                            <ul>
                                                <li>
                                                    <input

                                                        type="radio"
                                                        id={piece?.id}
                                                        name={attribute?.name}
                                                        value={piece?.value}
                                                        onFocus={this.onChangeValue}
                                                        defaultChecked

                                                    />
                                                    <label htmlFor={piece?.displayValue} style={{ backgroundColor: piece?.displayValue }}>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>

                                    ))
                                ) : (null)
                                }

                            </div>
                        </div>

                        <div className="price">
                            <h4> <strong>  PRICE:</strong> </h4>

                            {postYen && (<p> {yenPrice}  </p>)}
                            {postDollar && (<p> {dollarPrice}  </p>)}
                            {postPounds && (<p> {poundPrice}  </p>)}
                        </div>

                        <button
                            className="add-to-cart-button"
                            onClick={() => this.cartAddition()}

                        >
                            ADD TO CART
                        </button>
                        <ToastContainer
                            position="top-center"
                            autoClose={1000}
                        />


                        <div className="description">
                            <h4> <strong> Description </strong> </h4>

                            <p>   {DOMPurify.sanitize(description,
                                {
                                    FORBID_TAGS: ['div', 'ul', 'li', 'span', 'h1', 'h2', 'h3', 'b', 'p', 'q'],
                                    KEEP_CONTENT: true
                                })}
                            </p>


                        </div>


                    </div>
                </div>


            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDescription);