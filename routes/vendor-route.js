const router = require('express').Router();
const userController = require('../controllers/user-controller')
const asyncMiddleware = require('../middlewares/async-middleware');
const garageController = require('../controllers/garage-controller');
const upload = require('../services/file-upload-service');

router.get('/profile', asyncMiddleware(userController.profile))                                                             // Fetch Self Information
router.patch('/profile', upload.single('image'), asyncMiddleware(userController.updateUser))
router.post('/garage', upload.array('images'), asyncMiddleware(garageController.createGarage));
router.get('/garage', asyncMiddleware(garageController.findGarage));


module.exports = router;