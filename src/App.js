import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Product from "./pages/productList/Product";
import CartPage from "./pages/cartPage/CartPage.js";
import ProductDescription from "./pages/productDescription/ProductDescription";

import './App.css';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,

} from "@apollo/client";


const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/"
});


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(window.localStorage.getItem('state')) ||
    {
      postDollar: true,
      postPounds: false,
      postYen: false,
      selectedId: ''
    }
    this.updateState = this.updateState.bind(this);
  }


  updateState(newState) {

    window.localStorage.setItem('state', JSON.stringify(newState));
    this.setState(newState);

  };




  render() {
    return (
      <Router>
        <Navbar
          state={this.state}
          updateState={this.updateState}

        />
        <div id="mainbody">
          <ApolloProvider client={client} >

            <Routes>
                <Route exact path='/' element={<Product
                  updateState={this.updateState} state={this.state}
                />}
                />

                <Route exact path='/product/:id' element={<ProductDescription state={this.state} updateState={this.updateState} />} />

                {/* <Route path='/miniCart' element={<CartCard />} /> */}

                {/* <Route exact path='/cartpage' element={<CartPage />} /> */}
            </Routes>
          </ApolloProvider>
        </div>
      </Router >
    );
  };
}

