const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    building: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true
    },
    locality: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
    },
    pin: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true,
        default: 'India'
    }

});

module.exports = new mongoose.model('Address', addressSchema, 'addresses');