const BASE_URL = process.env.BASE_URL || "http://localhost:8000";

class GarageDto {
    id;
    vendorId;
    name;
    email;
    mobile;
    description;
    images;
    address;
    status;
    registrationDate;

    constructor(data) {
        this.id = data._id;
        this.vendorId = data.vendorId;
        this.name = data.name;
        this.email = data.email;
        this.mobile = data.mobile;
        this.description = data.description;
        this.images = data.images ? data.images.map((o) => { const image = o.image; const id = o._id; return { image: BASE_URL + '/storage/images/garage/' + image, id } }) : null;;
        this.address = data.address;
        this.status = data.status;
        this.registrationDate = data.registrationDate;
    }
}

module.exports = GarageDto;