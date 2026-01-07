const jwt = require("jsonwebtoken");
const CustomErrorHandler = require("../utils/custom-error-handler");

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(CustomErrorHandler.UnAuthorized("Bearer token topilmadi!"));
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return next(CustomErrorHandler.UnAuthorized("Token taqdim etilmadi!"));
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.user = decoded;
        
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return next(CustomErrorHandler.UnAuthorized("Token muddati tugagan!"));
        }
        next(CustomErrorHandler.UnAuthorized("Yaroqsiz token!"));
    }
};

// Admin 
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
return next(CustomErrorHandler.forbidden("siz admin emassiz"))
    }
};

module.exports = { verifyToken, isAdmin };