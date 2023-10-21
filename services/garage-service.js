const GarageModel = require('../models/garage-model');

class GarageService {

    createGarage = async data => await GarageModel.create(data);

    findGarage = async filter => await GarageModel.findOne(filter);

    findGarages = async filter => await GarageModel.find(filter);


}

module.exports = new GarageService();