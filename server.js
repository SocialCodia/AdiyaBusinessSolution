const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConfig = require('./configs/db-config');
const errorMiddleware = require('./middlewares/error-middleware');
const ErrorHandler = require('./utils/error-handler');
const userRoute = require('./routes/user-route');
const adminRoute = require('./routes/admin-route');
const authRoute = require('./routes/auth-route');
const vendorRoute = require('./routes/vendor-route');
const { auth, authRole } = require('./middlewares/auth-middleware');
const app = express();
const PORT = process.env.PORT || 8000;
const VERSION_NAME = process.env.VERSION_NAME || 'v1';
require('dotenv').config();

//Database Connection
dbConfig.connect();

const corsOption = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:80']
}

//Middlwares
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());

app.use(`/api/${VERSION_NAME}/auth`, authRoute);
app.use(`/api/${VERSION_NAME}/user`, auth, authRole('user'), userRoute);
app.use(`/api/${VERSION_NAME}/admin`, auth, authRole('admin'), adminRoute);
app.use(`/api/${VERSION_NAME}/vendor`, auth, authRole('vendor'), vendorRoute);

app.use('/storage', express.static('storage'));

//404 Not Found Middlewware
app.use((req, res, next) => {
    return next(ErrorHandler.notFound());
});

//Error Middleware
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Listing On Port ${PORT}`))