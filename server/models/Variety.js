const {Schema, model} = require('mongoose');

const varietySchema = new Schema({
    id: {
        type: String,
    },
    varietyName: {
        type: String,
        required: true,
        unique: true
    },
    varietyDescription: {
        type: String,
        required: true
    },
    varietyImage: {
        type: String,
        required: true
    }
});

const Variety = model('Variety', varietySchema);

module.exports = Variety;