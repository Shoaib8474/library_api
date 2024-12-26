const express = require('express');
const router = express.Router();
const sequelize = require('../../config/database')
const { Sequelize } = require('sequelize');
const login = require('../../controllers/authetication/loginUser');
const register = require('../../controllers/authetication/registerUser');

router.post('/registration', register);
router.post('/login', login);


module.exports = router;