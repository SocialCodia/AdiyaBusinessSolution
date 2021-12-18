
class AddressDto {

    id;
    building;
    street;
    locality;
    city;
    state;
    pin;
    country;

    constructor(data) {
        this.id = data._id;
        this.building = data.building;
        this.street = data.street;
        this.locality = data.locality;
        this.city = data.city;
        this.state = data.state;
        this.pin = data.pin;
        this.country = data.country;
    }

}

module.exports = AddressDto;