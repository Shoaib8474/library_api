
const express = require('express');
const router = express.Router();
const sequelize = require('../config/database')
const { Sequelize } = require('sequelize');
const { authenticateToken} = require('../middlewares/token_authentication')

const bookQueries = require('../controllers/fetchControllers/bookQueries');

// Get all books with details
router.get('/books', authenticateToken, bookQueries.getBooksWithDetails);

// Get currently borrowed books
router.get('/books/borrowed',authenticateToken, bookQueries.getBorrowedBooks);

// Get low stock books
router.get('/books/low-stock',authenticateToken,  bookQueries.getLowStockBooks);

// Search books
router.get('/books/search', authenticateToken, bookQueries.searchBooks);

// Get borrowing history
router.get('/borrowings/history',authenticateToken, bookQueries.getBorrowingHistory );



module.exports = router;
