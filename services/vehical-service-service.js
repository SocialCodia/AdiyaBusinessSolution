const VehicalServiceModel = require("../models/vehical-service-model");

class VehicalServiceService {

    createVehicalService = async info => await VehicalServiceModel.create(info);

    findVehicalService = async filter => await VehicalServiceModel.find(filter);

    findVehicalServices = async filter => {
        return await VehicalServiceModel.aggregate(
            [
                {
                    $group:
                    {
                        _id: { "type": "$type", name: "$name", icon: "$icon" },
                    }
                },
                {
                    "$group": {
                        "_id": "$_id.type",
                        "name": {
                            "$push": "$_id.name"
                        },
                        "icon": { "$first": "$_id.icon" }
                    }
                }
            ]
        );

    }
}
module.exports = new VehicalServiceService();