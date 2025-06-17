const Joi = require("joi");

const contactValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().required(),
  message: Joi.string().allow(""), // optional message
  jobRoleName: Joi.string().required(),
});

module.exports = contactValidationSchema;
