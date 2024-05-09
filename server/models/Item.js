const {Schema, model} = require('mongoose');

const itemSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    itemDescription: {
        type: String,
        required: true
    },
    variety: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isFeatured: {
        type: Boolean,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

const Item = model('Item', itemSchema);

module.exports = Item;