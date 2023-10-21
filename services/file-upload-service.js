const multer = require('multer');

const storageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'image')
            cb(null, './storage/images/profile/')
        else if (file.fieldname === 'icon')
            cb(null, './storage/images/icons/')
        else if (file.fieldname === 'images')
            cb(null, './storage/images/garage/')
        else
            cb(null, false);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
    }
})


const upload = multer({ storage: storageEngine });
module.exports = upload;