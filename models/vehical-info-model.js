const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const vehicalInformationSchema = new Schema({

    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: ['year', 'manufacturer', 'model', 'mileage', 'fueltype']
    }

});


module.exports = new mongoose.model('VehicalInformation', vehicalInformationSchema, 'vehical_informations');