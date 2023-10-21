
class PackageDto {

    id;
    name;
    time;
    warranty;
    recommended;
    includes;

    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.time = data.time;
        this.warranty = data.warranty;
        this.recommended = data.recommended;
        this.includes = data.includes;
    }

}

module.exports = PackageDto;