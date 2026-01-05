const jwt = require("jsonwebtoken")
const CustomErrorHandler = require("../utils/custom-error-handler")
const authorization = (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization

        if (!bearerToken) {
            throw CustomErrorHandler.UnAuthorized("bearer toen not found")
        }

        const token = bearerToken.split(" ")

        if(token[0] !== "Bearer") {
            return res.status(401).json({
                message: "Bearer token is required"
            })
        }
        if(!token[1]) {
            throw CustomErrorHandler.UnAuthorized("token nou found")
        }

        const decode = jwt.verify(token[1], process.env.SECRET_KEY)

        if(decode.role !== "admin") {
            return res.status(403).json({
                message: "you are not admin"
            })
        }
        req.user = decode
        next()
    }catch(error) {
   next(error)
    }
}