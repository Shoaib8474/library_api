const Joi = require("joi");

// Schema for user registration
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Schema for login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// password updation schema
const passwordUpdateSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  newPassword: Joi.string().min(6).required(),
});


// Schema for updation
const updateSchema = Joi.object({
  status: Joi.string().required(),
  returnDate: Joi.date().required(),
});


module.exports = { registerSchema, loginSchema, updateSchema, passwordUpdateSchema};
