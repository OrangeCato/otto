function errorHandler(err, req, res, next) {
    // Log the error for debugging purposes
    console.error(err.stack);

    // Customize error response based on the type of error or its properties
    if (err.name === 'ValidationError') {
        // Handle specific error type (e.g., Mongoose validation error)
        return res.status(400).json({ error: err.message });
    }

    // Default to 500 server error
    res.status(500).json({ error: 'Internal Server Error' });
}

module.exports = errorHandler;
