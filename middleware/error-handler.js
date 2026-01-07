const errorHandler = (err, req, res, next) => {
    let status = err.status || 500
    let message = err.message || "internal server error"

    if (err.isJoi) {
        status = 400
    }

    if (err.code == "LIMIT_FILE_SIZE") {
        status = 400
        message =  "rasm eng kopi 4b blishi mumkin"
    }

    res.status(status).json({
        message: message
    })
}

module.exports = errorHandler