const router = require('express').Router();
const adminController = require('../controllers/admin-controller');
const userController = require('../controllers/user-controller');
const garageController = require('../controllers/garage-controller');
const vehicalInfoController = require('../controllers/vehical-info-controller');
const vehicalServiceController = require('../controllers/vehical-service-controller');
const asyncMiddleware = require('../middlewares/async-middleware');
const upload = require('../services/file-upload-service');
const packageController = require('../controllers/package-controller');
const categoryController = require('../controllers/category-controller');


router.get('/profile', asyncMiddleware(userController.profile))                                                             // Fetch Self Information
router.patch('/profile', upload.single('image'), asyncMiddleware(userController.updateUser))                                // Update Self Information
router.get('/users', asyncMiddleware(adminController.users));                                                               // All Users
router.get('/admins', asyncMiddleware(adminController.users));                                                              // All Admins
router.get('/vendors', asyncMiddleware(adminController.users));                                                             // All Vendors
router.post('/user', upload.single('image'), asyncMiddleware(adminController.createUser));                                  // Add User
router.patch('/user', upload.single('image'), asyncMiddleware(adminController.updateUser));                                 // Update User
router.get('/user/:id', asyncMiddleware(adminController.user));                                                             // Single User
router.post('/vehical_info', asyncMiddleware(vehicalInfoController.createVehicalInfo));                                     // Add Vehical Information
router.get('/vehical_infos', asyncMiddleware(vehicalInfoController.findVehicalInfos));                                      // Vehical Informations
router.post('/vehical_service', upload.single('icon'), asyncMiddleware(vehicalServiceController.createVehicalService));     // Add Vehical Service
router.get('/vehical_service/:type', asyncMiddleware(vehicalServiceController.findVehicalService));                         // Vehical Service
router.get('/vehical_services', asyncMiddleware(vehicalServiceController.findVehicalServices));                             // Vehical Services
router.post('/garage', upload.array('images'), asyncMiddleware(garageController.createGarage));                             // Create Garage
router.get('/garages', asyncMiddleware(garageController.findGarages));                                                      // All Garages
router.get('/garages/:status', asyncMiddleware(garageController.findGarages));                                              // All Garages
router.get('/garage/:id', asyncMiddleware(garageController.findGarage));                                                    // Active / Pending / Banned Garages
router.post('/package', asyncMiddleware(packageController.createPackage));                                                  // Create Package
router.get('/packages', asyncMiddleware(packageController.findPackages));                                                   // All Packages
router.get('/packages/category/:id', asyncMiddleware(packageController.findPackages));                                      // Packages By Category
router.get('/package/:id', asyncMiddleware(packageController.findPackage));                                                 // Single Package
router.post('/category', upload.single('icon'), asyncMiddleware(categoryController.createCategory));                        // Add Category
router.patch('/category', upload.single('icon'), asyncMiddleware(categoryController.updateCategory));                        // Update Category
router.get('/category/:id', asyncMiddleware(categoryController.findCategory));                                              // Category
router.get('/categories', asyncMiddleware(categoryController.findCategories));                                              // Categories



module.exports = router;