const express = require('express');
const router = express.Router();
const sequelize = require('../config/database')
const categoryQueries = require('../controllers/fetchControllers/categoryQuery');
const { authenticateToken} = require('../middlewares/token_authentication')


router.get('/category', authenticateToken, categoryQueries.getCategoryWithDetails);
router.get('/category/available',authenticateToken, categoryQueries.getCategoriesWithAvailableBooks);
router.get('/category/search',authenticateToken,  categoryQueries.searchBooksInCategory);
router.get('/category/popular', authenticateToken, categoryQueries.getPopularCategories);


module.exports = router