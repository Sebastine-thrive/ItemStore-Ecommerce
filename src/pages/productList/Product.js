import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
    InMemoryCache,
    ApolloClient,
} from "@apollo/client"

import Loading from "../../components/loading/Loading";
import { GET_ALL_ITEMS } from "../../components/Queries";
// import ProductDescription from "../productDescription/ProductDescription";
import "./Product.css";


class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allProduct: {},
            // selected: null
        }


        this.client = new ApolloClient({
            cache: new InMemoryCache(),
            uri: "http://localhost:4000/"
        });
    }

    componentDidMount() {
        this.client.query({ query: GET_ALL_ITEMS })
            .then(data => {
                // console.log(data)
                this.setState({ allProduct: data })
            })
    }

    render() {
        // console.log(this.state)
        const { updateState } = this.props;
        const { allProduct } = this.state;
        const { postDollar,
                postPounds,
                postYen,
                selectedId
            } = this.props.state;


        let x = allProduct?.data?.category;
        let products = x?.products;

        if (products === undefined)
            return <h2 className="error"> Error...unable to load products </h2>

        if (allProduct.error)
            return <h2 className="error"> Error...unable to load data </h2>

        if (allProduct.loading)
            return <Loading />

        if (allProduct.data) {

            return (
                <>
                    <h3> {x?.name} <span> Items</span></h3>

                    <div className="product-body" >
                        {
                            products.map((product) => {
                              
                                let dollarCurrency = product?.prices[0]?.currency?.symbol;
                                let dollarPrice = product?.prices[0]?.amount;

                                let poundCurrency = product?.prices[1]?.currency?.symbol;
                                let poundPrice = product?.prices[1]?.amount

                                let yenCurrency = product?.prices[3]?.currency?.symbol;
                                let yenPrice = product?.prices[3]?.amount;


                                return (

                                    <article key={product.id} className="productcard">

                                        <div className="productcard-img-container">

                                            <img src={product?.gallery[0]} alt="" />
                                        </div>

                                        <div className="productcard-info">
                                            <p> {product?.brand} {product?.name} </p>

                                            {postYen && (<p> {yenCurrency} {yenPrice}  </p>)}
                                            {postDollar && (<p> {dollarCurrency} {dollarPrice}  </p>)}
                                            {postPounds && (<p> {poundCurrency} {poundPrice}  </p>)}


                                        </div>



                                        <div className="postcard-footer">
                                            <Link
                                                to={`/product/${product.id}`}
                                            >

                                                <button
                                                    onClick={() => updateState({selectedId: product?.id} )
                                                    }
                                                    className='productcard-button'>
                                                    DETAILS
                                                </button>

                                            </Link>
                                        </div>

                                    </article>
                                )
                            })
                        }
                    </div >
                </>
            )
        }
    };
}
export default Product;