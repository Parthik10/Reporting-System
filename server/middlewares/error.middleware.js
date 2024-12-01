const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500; // Corrected 'error' to 'err'
    const message = err.message || "BACKEND ERROR";
    const extraDetails = err.extraDetails || "ERROR FROM BACKEND";

    return res.status(status).json({ message, extraDetails });
};

module.exports = errorMiddleware;
