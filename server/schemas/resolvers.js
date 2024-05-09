const {signToken, AuthenticationError} = require('../utils/auth');
const {User, Item, Variety} = require('../models');
const mongoose = require('mongoose');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('cart');
        },
        user: async (_parent, {_id}) => {
            try {
                const user = await User.findById(_id);
                return user;
            } catch (error) {
                throw new Error('Failed to fetch user!!');
            }
        },
        items: async () => {
            return Item.find();
        },
        item: async (parent, {itemId}) => {
            return Item.findOne({_id: itemId});
        },
        varieties: async () => {
            return Variety.find();
        }
    },
    Mutation: {
        addUser: async (_parent, {firstName, lastName, email, password}) => {
            const user = await User.create({firstName, lastName, email, password});
            const token = signToken(user);
            return {token, user};
        },
        login: async (_parent, {email, password}) => {
            const user = await User.findOne({email});

            if (!user) {
                throw AuthenticationError;
            };

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw AuthenticationError;
            };

            const token = signToken(user);

            return {token, user};
        },
        addToCart: async (_parent, {_id, cart}) => {
            const user = await User.findById(_id);
            if (!user) {
                throw new Error('User not found');
            }
            user.cart.unshift(...cart);
            const updatedUser = await user.save();
            return updatedUser;
        },                           
        removeFromCart: async (_parent, {_id, index}) => {
            const user = await User.findById(_id);
            if (!user) {
                throw new Error('User not found');
            }
            user.cart.splice(index, 1); // Remove the item at the specified index
            const updatedUser = await user.save();
            return updatedUser;
        },
        addVariety: async (_parent, {varietyName, varietyDescription, varietyImage}) => {
            const newVariety = await Variety.create({varietyName, varietyDescription, varietyImage});
            return newVariety;
        },
        editVariety: async (_parent, {_id, varietyName, varietyDescription, varietyImage}) => {
            const updatedVariety = await Variety.findByIdAndUpdate(_id, {varietyName, varietyDescription, varietyImage}, {new: true});
            if (!updatedVariety) {
                throw new Error('Variety not found!!')
            }
            return updatedVariety;
        },
        deleteVariety: async (_parent, {_id}) => {
            try {
                const deletedVariety = await Variety.findByIdAndDelete(_id);
                return deletedVariety;
            } catch (error) {
                throw new Error('Failed to delete!!');
            };
        },
        addItem: async (_parent, {itemName, itemDescription, variety, price, isFeatured, image, author}) => {
            const newItem = await Item.create({itemName, itemDescription, variety, price, isFeatured, image, author});
            return newItem;
        },
        deleteItem: async (_parent, {_id}) => {
            try {
                const deletedItem = await Item.findByIdAndDelete(_id);
                return deletedItem;
            } catch (error) {
                throw new Error('Failed to delete!!');
            };
        },
        editItem: async (_parent, {_id, itemName, itemDescription, variety, price, isFeatured, image, author}) => {
            const updatedItem = await Item.findByIdAndUpdate(_id, {itemName, itemDescription, variety, price, isFeatured, image, author}, {new: true});
            if (!updatedItem) {
                throw new Error('Item not found!!')
            }
            return updatedItem;
        }
    }
};

module.exports = resolvers;