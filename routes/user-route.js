const userController = require('../controllers/user-controller');
const asyncMiddleware = require('../middlewares/async-middleware');
const upload = require('../services/file-upload-service');
const vehicalServiceController = require('../controllers/vehical-service-controller');
const vehicalInfoController = require('../controllers/vehical-info-controller');
const addressController = require('../controllers/address-controller');
const garageController = require('../controllers/garage-controller');
const packageController = require('../controllers/package-controller');
const categoryController = require('../controllers/category-controller');

const router = require('express').Router();

router.get('/profile', asyncMiddleware(userController.profile))                                         // Fetch Self Information
router.patch('/profile', upload.single('image'), asyncMiddleware(userController.updateUser))            // Update Self Information
router.get('/vehical_infos', asyncMiddleware(vehicalInfoController.findVehicalInfos));                  // Vehical Informations
router.get('/vehical_services', asyncMiddleware(vehicalServiceController.findVehicalServices));         // Vehical Services
router.get('/vehical_service/:type', asyncMiddleware(vehicalServiceController.findVehicalService));     // Vehical Service
router.post('/address', asyncMiddleware(addressController.createAddress));                              // Add Address
router.get('/address', asyncMiddleware(addressController.findAddress));                                 // Get Address
router.patch('/address', asyncMiddleware(addressController.updateAddress));                             // Update Address
router.get('/garages', asyncMiddleware(garageController.findGarages));                                  // Get Garages
router.get('/garage/:id', asyncMiddleware(garageController.findGarage));                                // Get Garage
router.get('/packages', asyncMiddleware(packageController.findPackages));                               // All Packages
router.get('/packages/category/:id', asyncMiddleware(packageController.findPackages));                  // Packages By Category
router.get('/package/:id', asyncMiddleware(packageController.findPackage));                             // Single Package
router.get('/category/:id', asyncMiddleware(categoryController.findCategory));                          // Category
router.get('/categories', asyncMiddleware(categoryController.findCategories));                          // Categories

module.exports = router;