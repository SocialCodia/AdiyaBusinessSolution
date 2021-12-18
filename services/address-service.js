const AddressModel = require('../models/address-model');

class AddressService {

    createAddress = async data => await AddressModel.create(data);

    updateAddress = async (userId, _id, data) => await AddressModel.updateOne({ userId, _id }, data);

    findAddress = async filter => await AddressModel.findOne(filter);

}

module.exports = new AddressService();