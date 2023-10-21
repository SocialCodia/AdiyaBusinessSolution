const mongoose = require('mongoose');

class DbConfig {
    connect = () => {
        mongoose.connect('mongodb://localhost:27017/adiya')
            .then(() => console.log('Connected With Database'))
            .catch((err) => console.log('Failed To Connect With Database Server : ' + err.message));
    }
}

module.exports = new DbConfig();