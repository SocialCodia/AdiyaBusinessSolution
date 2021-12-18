const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const packageSchema = new Schema({
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true,
    },
    warranty: {
        duration: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            enum: ['minute', 'hour', 'day', 'month', 'year']
        },
        note: {
            type: String,
            required: false,
            default: 'No Notes'
        }
    },
    recommended: {
        type: Boolean,
        required: false,
        default: false,
    },
    includes: [
        {
            type: String,
        }
    ]

});


module.exports = new mongoose.model('Package', packageSchema, 'packages');