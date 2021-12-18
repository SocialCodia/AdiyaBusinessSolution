
class VehicalInfoService {

    id;
    name;
    type;

    constructor(data) {
        this.type = data._id;
        this.name = data.name;
    }
}


module.exports = VehicalInfoService;