const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const garageSchema = new Schema({
    vendorId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false,
        default: "This garage doesn't any description"
    },
    images: [{
        image: {
            type: String,
            required: true
        }
    }],
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'banned', 'pending'],
        default: 'pending'
    },
    registrationDate: {
        type: Date,
        default: Date.now()
    }
}, {
    timestamps: true
});

module.exports = new mongoose.model('Garage', garageSchema, 'garages');