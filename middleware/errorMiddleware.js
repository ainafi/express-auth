const errorMiddleware = (err, req, res, next) => {
    try {
        let error={...err}
        error.message = err.message || "Internal Server Error";

        // mongoose bad object id error
        if(err.name === "CastError") {
            error.statusCode = 400;
            error.message = `Resource not found. Invalid: ${err.path}`;
        }

        // mongoose duplicate key error
        if(err.code === 11000) {
            error.statusCode = 400;
            error.message = `Duplicate key error: ${Object.keys(err.keyValue)[0]} already exists`;
        }
        // mongoose validation error
        if(err.name === "ValidationError") {
            error.statusCode = 400;
            error.message = Object.values(err.errors).map(val => val.message).join(", ");
        }
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
        console.error(err);
    } catch (error) {
        next(error);
    }
}

export default errorMiddleware;