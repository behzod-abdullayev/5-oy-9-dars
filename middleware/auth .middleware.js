const CustomErrorHandler = require("../utils/custom-error-handler");

const isSelf = (req, res, next) => {
  try {

    if (!req.user) {
      return next(CustomErrorHandler.UnAuthorized("Token topilmadi"));
    }

    const loggedInUserId = req.user.id || req.user._id; 
    const targetUserId = req.params.id;


    if (loggedInUserId === targetUserId) {
      return next();
    }

    return next(
      CustomErrorHandler.forbidden(
        "Siz faqat o'z profilingiz ma'lumotlarini o'zgartira olasiz"
      )
    );
  } catch (error) {
    next(error);
  }
};

module.exports = isSelf;