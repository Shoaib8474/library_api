// routes/book.routes.js
const express = require('express');
const router = express.Router();
const sequelize = require('../../config/database')
const { Sequelize } = require('sequelize');
const borrowingController = require('../../controllers/updateControllers/updateBorrowing')


// Update borrowing status with related book quantity
router.patch('/borrowings/status', borrowingController.updateBorrowingStatus);

module.exports = router