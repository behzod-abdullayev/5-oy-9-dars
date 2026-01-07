const Joi = require("joi");

const changePasswordValidator = Joi.object({
  currentPassword: Joi.string().trim().required().min(8).max(100).messages({
    "string.min": "parol eng kami 8 ta belgidan iborat",
  }),
  newPassword: Joi.string()
    .trim()
    .min(8)
    .max(100)
    .pattern(new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)`))
    .required()
    .messages({
      "string.min": "parol kamida 8 ta belgidan iborat bo'lishi kerak",
      "string.pattern.base":
        "parolda kamida bitta katta, bitta kichik va bitta raqam qatnashishi kerak",
    }),

 confirmPassword: Joi.string().required().valid(Joi.ref(`newPassword`)).messages({
    "any.only": "tasdiqlash paroli yangi parol bilan mos kelmadi",
    "any.required": "parolni tasdiqlash shart"
 })
});

module.exports = changePasswordValidator