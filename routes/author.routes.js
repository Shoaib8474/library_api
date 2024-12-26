const express = require('express');
const router = express.Router();
const sequelize = require('../config/database')
const { Sequelize } = require('sequelize');
const { authenticateToken} = require('../middlewares/token_authentication')


const authorQueries = require('../controllers/fetchControllers/authorQueries');

router.get('/author', authenticateToken, async (req, res)=> {res.send({success: true})});
router.get('/author/authorBookCount', authenticateToken,  authorQueries.authorWithPublicationCount);
router.get('/author/authorBookSpecificGenre', authenticateToken,  authorQueries.authorWithSpecificGenre);

module.exports = router;