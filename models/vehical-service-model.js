const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const vehicalServiceSchema = new Schema({

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
        enum: ['GeneralService', 'CustomRepairs', 'Denting & Painting', 'AC service & Repairs', 'Body Fittings', 'Wash & Detailing', 'Battery Care', 'Wheel Care', 'Insurance & Claims', 'Insurance & Claims', 'Independent inspections by MG']
    },
    icon: {
        type: String,
        required: true,
    }

});


module.exports = new mongoose.model('VehicalService', vehicalServiceSchema, 'vehical_services');