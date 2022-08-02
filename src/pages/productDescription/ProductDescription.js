import React, { Component } from "react"
import { onError } from "@apollo/client/link/error";
import { GET_ITEM_DETAILS } from "../../components/Queries";
import { InMemoryCache, ApolloClient, HttpLink, from } from "@apollo/client";
import Button from "../../components/button/Button";
import './ProductDescription.css';

import Loading from "../../components/loading/Loading";

import DOMPurify from 'dompurify';



class ProductDescription extends Component {
    constructor(props) {
        super(props);
        this.state = JSON.parse(window.localStorage.getItem('state')) ||        {
            singleItemDetails: {},
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
            new HttpLink({ uri: "http://localhost:4000/" }),
        ]);

        this.client = new ApolloClient({
            cache: new InMemoryCache(),
            link
        });


        this.componentDidMount = () => {
            this.client.query({
                query: GET_ITEM_DETAILS,
                variables: { id: this.props.state.selectedId }
            })
                .then(singleProductData => {
                    this.setState({ singleItemDetails: singleProductData })
                })
        }

    }


    render() {
        const { singleItemDetails } = this.state;
        const { updateState } = this.props;

        const { selectedId,
            postDollar,
            postPounds,
            postYen,
        } = this.props.state;

        
        // console.log(selectedId)
        // console.log(singleItemDetails)

        if (singleItemDetails?.data === undefined)
            return <h2 className="error"> Error...unable to load product details </h2>

        if (singleItemDetails.loading)
            return <Loading />

        const singleItem = singleItemDetails?.data?.product;

        const attributeItem = singleItem?.attributes[0]?.items
        // console.log(singleItem)

        let attribute = singleItem?.attributes[0]
        // console.log(attribute)

        let mainImageSource = singleItem?.gallery[0];

        let gallery = singleItem?.gallery;
        // console.log(gallery)

        let description = singleItem?.description;



        let price = singleItem?.prices;

        let dollarCurrency = price[0].currency?.symbol
        let dollarAmount = price[0]?.amount

        let poundCurrency = price[1].currency?.symbol
        let poundAmount = price[1]?.amount

        let yenCurrency = price[3].currency?.symbol
        let yenAmount = price[3]?.amount



        return (

            <div className="pdt-desc-body"  >
                <div className="pdt-desc-main">

                    <div className="pdt-desc-submain">

                        <div className="pdt-desc-thumbnails">
                            {gallery?.map((image, index) => (


                                <img key={index} src={image} alt="" height={'80%'} width={'60%'} />
                            ))}

                        </div>

                        <div>
                            <img src={mainImageSource} alt="" height={'50%'} width={'100%'} />
                        </div>

                    </div>


                    <div className="pdt-desc-submain2">
                        <div className="pdt-desc-name">
                            <h3> {singleItem?.brand}</h3>
                            <h4> {singleItem?.name}</h4>
                        </div>

                        <div>
                            <h4> <strong>  {attribute?.name}</strong> </h4>


                            <div className="pdt-desc-attr">


                                {(attribute && attribute?.type === 'text') ? (
                                    attributeItem.map((item, index) => (

                                        <div className="Box" key={index}>
                                            <ul>
                                                <li>
                                                    <input className="text-box" type="radio"
                                                        id={item?.id}
                                                        name={attribute?.name}
                                                        value={item?.value}
                                                        style={{ backgroundColor : "red" }}

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

                                        <div className="Box" key={index}>
                                            <ul>
                                                <li>
                                                    <input className="color-box" type="radio"
                                                        id={piece?.id}
                                                        name={attribute?.name}
                                                        value={piece?.value}
                                                        style={{ backgroundColor: piece?.displayValue.toLowerCase() }}
                                                    />
                                                    <label htmlFor={piece?.displayValue} > {piece.displayValue.toLowerCase() } </label>
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

                            {postYen && (<p> {yenCurrency} {yenAmount}  </p>)}
                            {postDollar && (<p> {dollarCurrency} {dollarAmount}  </p>)}
                            {postPounds && (<p> {poundCurrency} {poundAmount}  </p>)}

                        </div>



                        < Button >
                            ADD TO CART
                        </Button>

                        <div className="description">
                            <h4> <strong> Description </strong> </h4>


                            {DOMPurify.sanitize( description ,
                                {
                                    FORBID_TAGS: ['div', 'ul', 'li', 'span', 'h1','h2','h3', 'b', 'p', 'q'],
                                    KEEP_CONTENT: true
                                })}

                        </div>
                    </div>
                </div>
            </div>

        )

    }
}


export default ProductDescription;

// export default (ProductDescription);