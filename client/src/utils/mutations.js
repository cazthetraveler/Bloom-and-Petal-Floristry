import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        firstName
        lastName
        cart
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        email
        firstName
        lastName
        cart
      }
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation addToCart($_id: ID!$cart: [String!]) {
    addToCart(_id: $_id, cart: $cart) {
      _id
      cart
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation removeFromCart($_id: ID!, $index: Int!) {
    removeFromCart(_id: $_id, index: $index) {
      _id
      cart
    }
  }
`;

export const ADD_VARIETY = gql`
  mutation addVariety($varietyName: String!, $varietyDescription: String!, $varietyImage: String!) {
    addVariety(varietyName: $varietyName, varietyDescription: $varietyDescription, varietyImage: $varietyImage) {
      _id
      varietyName
      varietyDescription
      varietyImage
    }
  }
`;

export const EDIT_VARIETY = gql`
mutation editVariety($_id: ID!, $varietyName: String!, $varietyDescription: String!, $varietyImage: String!) {
  editVariety(_id: $_id, varietyName: $varietyName, varietyDescription: $varietyDescription, varietyImage: $varietyImage) {
    _id
    varietyName
    varietyDescription
    varietyImage
  }
}`;

export const DELETE_VARIETY = gql`
  mutation deleteVariety($_id: ID!) {
    deleteVariety(_id: $_id) {
      _id
      varietyName
      varietyDescription
      varietyImage
    }
  }
`;

export const ADD_ITEM = gql`
mutation addItem($itemName: String!, $itemDescription: String!, $variety: [String!], $price: String!, $isFeatured: Boolean!, $image: String!, $author: String!) {
  addItem(itemName: $itemName, itemDescription: $itemDescription, variety: $variety, price: $price, isFeatured: $isFeatured, image: $image, author: $author) {
    _id
    itemName
    itemDescription
    variety
    price
    isFeatured
    image
    author
  }
}
`;

export const DELETE_ITEM = gql`
  mutation deleteItem($_id: ID!) {
    deleteItem(_id: $_id) {
      _id
      itemName
      itemDescription
      variety
      price
      isFeatured
      image
      author
    }
  }
`;

export const EDIT_ITEM = gql`
mutation editItem($_id: ID!, $itemName: String!, $itemDescription: String!, $variety: [String!], $price: String!, $isFeatured: Boolean!, $image: String!, $author: String!) {
  editItem(_id: $_id, itemName: $itemName, itemDescription: $itemDescription, variety: $variety, price: $price, isFeatured: $isFeatured, image: $image, author: $author) {
    _id
    itemName
    itemDescription
    variety
    price
    isFeatured
    image
    author
  }
}`;