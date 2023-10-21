const BASE_URL = process.env.BASE_URL || "http://localhost:8000"

class CategoryDto {

    id;
    name;
    icon;

    constructor(data) {
        this.id = data._id;
        this.name = data.name;
        this.icon = data.icon && `${BASE_URL}/storage/images/icons/${data.icon}`;
    }

}

module.exports = CategoryDto;