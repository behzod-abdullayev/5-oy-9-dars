const joi = require("joi");

const categoryValidator = joi.object({
  name: joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Kategoriya nomi bo'sh bo'lishi mumkin emas",
    "string.min": "Kategoriya nomi kamida 2 ta harf bo'lishi kerak",
    "any.required": "Kategoriya nomini kiritish shart",
  }),

  image: joi.string().uri().allow("", null),
});
module.exports = categoryValidator;
