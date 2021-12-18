const BASE_URL = process.env.BASE_URL || "http://localhost:8000"

class VehicalServiceDto {
    id;
    name;
    icon;
    type;

    constructor(data) {
        if (Array.isArray(data.name)) {
            this.type = data._id;
            this.icon = data.icon && `${BASE_URL}/storage/images/icons/${data.icon}`;
            this.name = data.name;
        }
        else {
            console.log(data);
            this.id = data.id;
            this.name = data.name;
            this.icon = data.icon && `${BASE_URL}/storage/images/icons/${data.icon}`;
            this.type = data.type;
        }

    }
}

module.exports = VehicalServiceDto;