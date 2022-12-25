import React, { Component } from 'react';
import { GET_ANY_PRODUCT } from '../../components/graphQl/Queries';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";
import ProductDisplay from '../../components/productDisplay/ProductDisplay';
import Loading from '../../components/loading/Loading';
import './Product.css';


export class Product extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            product: {}
        }

        this.client = new ApolloClient({
            cache: new InMemoryCache(),
            uri: "http://localhost:4000/"
        });
    }

    componentDidMount() {
        this.client.query({
            query: GET_ANY_PRODUCT,
            variables: { categoryName: this.props.itemName }
        })
            .then(productData => {
                this.setState({ product: productData })
            })
    }

    componentDidUpdate(prevsProps, prevState) {
        if (prevsProps.itemName !== this.props.itemName) {
            this.client.query({
                query: GET_ANY_PRODUCT,
                variables: { categoryName: this.props.itemName }
            })
                .then(productData => {
                    this.setState({ product: productData })
                })
        }
    }

    render() {

        const { updateState } = this.props;

        let state = this.props.state;
        // console.log(state)
        let currency = state?.currency;
        let menu = state?.menu;
        // console.log(this.props.itemName)

        let selectedId = state?.selectedId;
        let cartModalOpen = state?.cartModalOpen;


        let x = this.state.product?.data?.category;

        let products = x?.products;



        if (this.state.product.data === undefined) {
            return (
                <>
                    <Loading />
                    <h2 className='error'> Sorry! Unable to fetch data </h2>
                </>
            )
        }

        if (this.state.product?.loading) {
            return (
                <>
                    <Loading />
                    <h2 className='error'> Please wait... </h2>

                </>
            )
        }

        if (this.state.product.data) {

            return (
                <div className='mainbody'>
                    <h3 className='heading'> {x?.name} <span> Items</span></h3>

                    <ProductDisplay
                        products={products}
                        selectedId={selectedId}
                        cartModalOpen={cartModalOpen}
                        updateState={updateState}
                        state={state}
                    />
                </div>
            )
        }
    };
}
export default Product