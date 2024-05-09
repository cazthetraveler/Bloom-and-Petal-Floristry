const typeDefs = `
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        isAdmin: Boolean
        cart: [String]
    }

    type Item {
        _id: ID
        itemName: String
        itemDescription: String
        variety: [String]
        price: String
        isFeatured: Boolean
        image: String
        author: String
    }

    type Variety {
        _id: ID
        varietyName: String
        varietyDescription: String
        varietyImage: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(_id: ID!): User
        items: [Item]
        item(itemId: ID!): Item
        varieties: [Variety]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        addToCart(_id: ID!, cart: [String!]): User
        removeFromCart(_id: ID!, index: Int!): User
        addVariety(varietyName: String!, varietyDescription: String!, varietyImage: String!): Variety
        editVariety(_id: ID!, varietyName: String!, varietyDescription: String!, varietyImage: String!): Variety
        deleteVariety(_id:ID!): Variety
        addItem(itemName: String!, itemDescription: String!, variety: [String!], price: String!, isFeatured: Boolean!, image: String!, author: String!): Item
        deleteItem(_id: ID!): Item
        editItem(_id: ID!, itemName: String!, itemDescription: String!, variety: [String!], price: String!, isFeatured: Boolean!, image: String!, author: String!): Item
      }      
`;

module.exports = typeDefs;