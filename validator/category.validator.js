const joi = require("joi");

const categoryValidator = joi.object({
  name: joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Kategoriya nomi bo'sh bo'lishi mumkin emas",
    "string.min": "Kategoriya nomi kamida 2 ta harf bo'lishi kerak",
    "any.required": "Kategoriya nomini kiritish shart",
  }),
  image: joi.string().required().messages({
    "any.required": "Brend logotipi (rasmi) bo'lishi shart",
  }),
  foundedYear: joi.number()
    .integer()
    .max(new Date().getFullYear())
    .messages({
      "number.max": "Tashkil etilgan yil hozirgi yildan katta bo'lishi mumkin emas"
    }),
  founder: joi.string().trim().required().messages({
    "any.required": "Asoschi ismini kiritish shart"
  }),
  description: joi.string().min(3).max(150).trim()
});

module.exports = categoryValidator;