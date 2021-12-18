const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    name: {
        type: String,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        unique: true,
    },
    mobile: {
        type: String,
        unique: true,
        minlength: 10,
        maxlength: 13,
    },
    image: {
        type: String,
        required: false,
        default: 'user.png'
    },
    type: {
        type: String,
        enum: ['user', 'admin', 'vendor'],
        default: 'user',
    },
    status: {
        type: String,
        enum: ['active', 'banned'],
        default: 'active'
    }

});

module.exports = new mongoose.model('User', userSchema, 'users');