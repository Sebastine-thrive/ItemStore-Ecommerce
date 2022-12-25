import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { GET_ANY_CATEGORY } from "./components/graphQl/Queries";

import { connect } from 'react-redux';
import ProductDescription from "./pages/productDescription/ProductDescription";


import './App.css';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import Product from "./pages/productList/Product";
import Cart from "./components/cart/Cart";
import CartPage from "./pages/cartPage/CartPage";
import Sidebar from "./components/sidebar/Sidebar";


const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/"
});


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(localStorage.getItem('state')) ||
    {
      currency: {
        postDollar: true,
        postPounds: false,
        postYen: false
      },
      productCategory: '',
      cartModalOpen: false,
      selectedId: '',
      // menu: 'all',
      sideMenu: false
    }


    this.client = new ApolloClient({
      cache: new InMemoryCache(),
      uri: "http://localhost:4000/"
    });

    // this.addToCart = this.addToCart.bind(this)
  }


  componentDidMount() {
    this.client.query({ query: GET_ANY_CATEGORY })
      .then(data => {
        this.setState({
          ...this.state, productCategory: data
        })
      })
  }

  componentDidUpdate(prevsProps, prevState) {
    let menu = this.state.menu;
    if (prevsProps[menu] !== this.props[menu]) {
      this.client.query({
        query: GET_ANY_CATEGORY,
        variables: { menu: this.state.menu }

      })
        .then(data => {
          this.setState({
            ...this.state, productCategory: data
          })
        })
    }
  }

  updateState = (newState) => {
    window.localStorage.setItem('state', JSON.stringify(newState));
    this.setState(newState);
  };


  render() {
    let categoryNameArray = this.state.productCategory?.data?.categories;
    let allCategory = this.state.productCategory?.data?.categories[0]?.name;



    return (
      <Router>
        <Navbar
          state={this.state}
          updateState={this.updateState}
          categoryNameArray={categoryNameArray}
        />

        {this.state.sideMenu ? (
          <div className="sidebar">
            <Sidebar state={this.state} categoryNameArray={categoryNameArray} updateState={this.updateState}  />
          </div>) : null
        }

        {this.state.sideMenu ? (
          <div className="sidebar-overlay"> </div>) : null}


        {this.state.cartModalOpen ? (
          <div className="cart-modal">
            <button onClick={() => this.setState({ ...this.state, cartModalOpen: false })} className="btn-close"> X </button>
            <div>
              <Cart
                state={this.state}
                updateState={this.updateState} />
            </div>
          </div>
        ) : null}


        <div id="mainbody">
          <ApolloProvider client={client} >
            <Routes>
              <Route path='/' element={<Product
                state={this.state}
                itemName={allCategory}
                updateState={this.updateState}

              />} />

              {categoryNameArray?.map((item, index) => (
                <Route exact path={`/${item.name}`}
                  key={index}
                  element={<Product
                    state={this.state}
                    updateState={this.updateState}
                    itemName={item.name}
                  />} />
              )
              )}

              <Route exact path='/product/:id' element={<ProductDescription
                state={this.state}
                updateState={this.updateState}
                selectedId={this.state.selectedId}
              />}
              />

              <Route exact path='/cartpage' element={<CartPage
                state={this.state}
              />}
              />


            </Routes>
          </ApolloProvider>
        </div>

      </Router >
    );
  };
}

