const express = require("express");
const router = express.Router();
const sequelize = require("../../config/database");
const { Sequelize } = require("sequelize");
const login = require("../../controllers/authetication/loginUser");
const register = require("../../controllers/authetication/registerUser");
const updatePassword = require('../../controllers/authetication/updatePassword')

const {registerSchema, loginSchema, passwordUpdateSchema} = require('../../validator/validations');
const validate = require('../../middlewares/validate')

router.post("/registration", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.patch("/updatePassword", validate(passwordUpdateSchema), updatePassword);

module.exports = router;
