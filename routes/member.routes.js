const express = require('express');
const router = express.Router();
const sequelize = require('../config/database')
const { Sequelize } = require('sequelize');
const {authenticateToken} = require('../middlewares/token_authentication')
const memberQueries = require('../controllers/fetchControllers/memberQueries');

router.get('/member', async (req, res)=> {res.send("Meessie")});
router.get('/member/current', authenticateToken, memberQueries.getMemberCurrentBooks);
router.get('/member/overdue',  authenticateToken, memberQueries.getMembersWithOverdueBooks);
router.get('/member/search',  authenticateToken, memberQueries.searchActiveMembers);
router.get('/member/history', authenticateToken, memberQueries.getMemberBorrowingHistory);

module.exports = router;