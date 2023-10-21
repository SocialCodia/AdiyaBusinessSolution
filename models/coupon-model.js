const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const couponSchema = new Schema({

    

});

module.exports = new mongoose.model('Coupon',couponSchema,'coupons');