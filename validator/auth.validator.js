const Joi = require("joi");

// register
const registerValidator = Joi.object({
  username: Joi.string().trim().min(3).max(30).alphanum().required().messages({
    "string.empty": "Username bo'sh bo'lishi mumkin emas",
    "string.alphanum":
      "Username faqat harf va raqamlardan iborat bo'lishi kerak",
    "any.required": "Username kiritilishi shart",
  }),

  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .min(10)
    .max(50)
    .required()
    .messages({
      "string.email": "Noto'g'ri email formati kiritildi",
      "string.empty": "Email bo'sh bo'lishi mumkin emas",
    }),

  password: Joi.string()
    .trim()
    .min(8)
    .max(100)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])"))
    .required()
    .messages({
      "string.min": "Parol kamida 8 ta belgidan iborat bo'lishi kerak",
      "string.pattern.base":
        "Parolda kamida bitta katta harf, bitta kichik harf va raqam bo'lishi shart",
    }),

  role: Joi.string().valid("user", "admin").default("user"),
});

//login
const loginValidator = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().trim().required(),
});

//forgot password
const forgotPasswordValidator = Joi.object({
  email: Joi.string().trim().required().lowercase().email().messages({
    "string.email": "noto'g'ri email formati kiritildi",
    "string.empty": "email bo'sh bo'lishi mumkin emas",
    "any.required": "email kiritilishi shart",
  }),
  newPassword: Joi.string().trim().min(8).max(100)
  .pattern(new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)`)).required().messages({
    "string.min": "parol kamida 8 ta belgidan iborat bo'lsihi kerak",
    "string.pattern.base": "parolda kamida bitta katta, kichik harf va kamida bitta raqam bo'lishi lozim."
  }),
  confirmPassword: Joi.required()
  .valid(Joi.ref('newPassword'))
  .messages({
    "any.required": "parolni tasdiqlash shart",
    "any.only": "parol mos kelmadi"
  })
});

module.exports = {
  registerValidator,
  loginValidator,
  forgotPasswordValidator
};
