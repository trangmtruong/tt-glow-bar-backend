const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": "User name must be at least 2 characters",
      "string.max": "User name cannot be lopnger than 30 characters",
    }),
    email: Joi.string().required().email().messages({
      "string.empty": "Must enter email",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Must enter password",
    }),
  }),
});

const validateUserAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": "Must enter email",
    }),
    password: Joi.string().required().messages({
      "string.empty": "Must enter password",
    }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().length(24).hex().required().messages({
      "string.empty": "The ID field must be filled in",
      "string.length": " The ID must have 24 characters",
      "string.hex": "The ID must be a valid hexadecimal value",
    }),
  }),
});

module.exports = {
  validateUserInfo,
  validateUserAuthentication,
  validateId,
};
