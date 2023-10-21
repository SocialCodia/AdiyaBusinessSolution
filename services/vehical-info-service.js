const VehicalInfoModel = require('../models/vehical-info-model');

class VehicalInfoService {

    createVehicalInfo = async info => await VehicalInfoModel.create(info);

    findVehicalInfos = async filter => {
        return await VehicalInfoModel.aggregate(
            [
                {
                    $group:
                    {
                        _id: { "type": "$type", name: "$name" },
                    }
                },
                {
                    "$group": {
                        "_id": "$_id.type",
                        "name": {
                            "$push": "$_id.name"
                        },
                    }
                }
            ]
        );

    }
}
module.exports = new VehicalInfoService();