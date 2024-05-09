import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query Query {
    users {
      _id
      email
      firstName
      lastName
      cart {
        item {
          _id
          variety
          itemDescription
          itemName
          price
          image
        }
        quantity
      }
    }
  }
`;

export const GET_ONE_USER = gql`
  query User($userId: ID!) {
    user(_id: $userId) {
      _id
      firstName
      lastName
      email
      isAdmin
      cart
    }
  }
`;

export const GET_ITEMS = gql`
  query Items {
    items {
      _id
      itemName
      itemDescription
      variety
      price
      image
      author
      isFeatured
    }
  }
`;

export const GET_ONE_ITEM = gql`
  query Item($itemId: ID!) {
    item(itemId: $itemId) {
      _id
      variety
      itemDescription
      itemName
      price
      image
      author
      isFeatured
    }
  }
`;

export const GET_VARIETIES = gql`
  query Variety {
    varieties {
      _id
      varietyName
      varietyDescription
      varietyImage
    }
  }
`;