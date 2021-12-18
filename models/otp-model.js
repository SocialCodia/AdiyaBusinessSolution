const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const getExpireTime = () => {
    const time = new Date();
    time.setTime(time.getTime() + 1000 * 60 * 5)
    return time;
}

const otpSchema = new Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    otp: {
        type: Number,
        require: true,
    },
    expire: {
        type: Date,
        default: getExpireTime
    }
}, {
    timestamps: true
})

module.exports = new mongoose.model('Otp', otpSchema, 'otps');