import { gql } from "@apollo/client";

export const READ_CART = gql`
  query Query {
    readUser {
      cart {
        _id
        product {
          title
          price
          _id
          images {
            _id
            altText
            url
          }
        }
        quantity
      }
    }
  }
`;

export const READ_PRODUCTS = gql`
  query ReadProducts($id: ID, $category: String, $search: String) {
    readProducts(_id: $id, category: $category, search: $search) {
      _id
      title
      quantity
      price
      description
      images {
        _id
        altText
        url
      }
      ratings {
        _id
        body
        rating
        title
        user {
          _id
          username
        }
      }
    }
  }
`;

export const READ_USER = gql`
  query Query {
    readUser {
      firstName
      lastName
      username
      email
      billingAddress
      shippingAddress
    }
  }
`;

export const READ_ORDERS = gql`
  query Query {
    readUser {
      orders {
        _id
        purchaseDate
        cart {
          _id
          product {
            _id
            title
            price
            images {
              _id
              altText
              url
            }
          }
          quantity
        }
      }
    }
  }
`;

export const READ_USER_REVIEW = gql`
  query Query($productId: ID!) {
    readUserReview(productId: $productId) {
      _id
      body
      rating
      title
    }
  }
`;

export const HAS_PRODUCT_IN_ORDERS = gql`
  query Query($productId: ID!) {
    hasProductInOrders(productId: $productId)
  }
`;

export const HAS_EXISTING_REVIEW = gql`
  query Query($productId: ID!) {
    hasExistingReview(productId: $productId)
  }
`;