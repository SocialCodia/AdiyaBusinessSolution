class ErrorHandler extends Error {

    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }

    static serverError = (message = 'Internal Server Error') => {
        return new ErrorHandler(message, 500);
    }

    static badRequest = (message = 'Bad Request') => {
        return new ErrorHandler(message, 400);
    }

    static notFound = (message = 'Resource Not Found') => {
        return new ErrorHandler(message, 404);
    }

    static notAllowed = (message = 'Not Allowed') => {
        return new ErrorHandler(message, 403);
    }

    static unAuthorized = (message = 'Unauthorized Access') => {
        return new ErrorHandler(message, 401);
    }

}

module.exports = ErrorHandler;