const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    icon: {
        type: String,
        required: true,
    }
});

module.exports = new mongoose.model('Category', categorySchema, 'categories');