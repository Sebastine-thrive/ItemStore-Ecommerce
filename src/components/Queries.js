import { gql } from "@apollo/client";

export const GET_ALL_ITEMS = gql`
{
  category(input: {title: "all"}){
    name
    products {
      id
      name
      brand
      prices {
        amount
        currency{
          label
          symbol
        }
        amount
      }
      gallery
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
    }
  }
}`;


export const GET_ITEM_DETAILS = gql`
query ProductDetail($id:String!) {
    product(id: $id) {
      id
      name
      brand
      prices {
        amount
        currency{
          label
          symbol
        }
        amount
      }
      gallery
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
    }
  }`;