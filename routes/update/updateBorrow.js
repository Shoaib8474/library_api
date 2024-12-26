// routes/book.routes.js
const express = require('express');
const router = express.Router();
const sequelize = require('../../config/database')
const { Sequelize } = require('sequelize');
const borrowingController = require('../../controllers/updateControllers/updateBorrowing')
const { updateSchema } = require('../../validator/validations');
const validate = require('../../middlewares/validate')


// Update borrowing status with related book quantity
router.patch('/borrowings/status', validate(updateSchema), borrowingController.updateBorrowingStatus);

module.exports = router