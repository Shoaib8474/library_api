const { Sequelize } = require("sequelize");
const { Book, Author, Category, Borrowing, Member } = require("../../models");
const sequelize = require("../../config/database");
const { Op } = require("sequelize");

const memberQueries = {

// 1. Search active members by name or email
  searchActiveMembers: async (req, res) => {
    try {
      const { searchTerm } = req.body;
      const members = await Member.findAll({
        where: {
          status: "active",
          [Op.or]: [
            { name: { [Op.like]: `%${searchTerm}%` } },
            { email: { [Op.like]: `%${searchTerm}%` } },
          ],
        },
        include: [
          {
            model: Borrowing,
            where: {
              status: "borrowed",
            },
            required: false,
            include: [
              {
                model: Book,
                attributes: ["title", "ISBN"],
              },
            ],
          },
        ],
      });
      return res.json({ success: true, data: members });
    } catch (error) {
      return res.send(500).json({ success: false, error: error.message });
    }
  },

  // 2. Find members with overdue books
  getMembersWithOverdueBooks: async (req, res) => {
    try {
      const members = await Member.findAll({
        include: [
          {
            model: Borrowing,
            where: {
              dueDate: {
                [Op.lt]: new Date(), // Due date is less than current date
              },
              returnDate: null,
              status: "borrowed",
            },
            include: [
              {
                model: Book,
                attributes: ["title", "ISBN"],
              },
            ],
          },
        ],
        order: [["name", "ASC"]],
      });
      return res.json({ success: true, data: members });
    } catch (error) {
      return res.send(500).json({ success: false, error: error.message });
    }
  },

    //3. Get member''s current borrowed books with authors
  getMemberCurrentBooks: async (req, res) => {
    console.log(req.body);
    try {
      const { memberId = 1 } = req.body;
      const members = await Member.findOne({
        where: { id: memberId },
        include: [
          {
            model: Borrowing,
            where: {
              status: "borrowed",
              returnDate: null,
            },
            include: [
              {
                model: Book,
                include: [
                  {
                    model: Author,
                    through: { attributes: [] },
                  },
                ],
              },
            ],
          },
        ],
      });
      return res.json({ success: true, data: members });
    } catch (error) {
      return res.send(500).json({ success: false, error: error.message });
    }
  },

     // 4. Get member's borrowing history between dates
   async getMemberBorrowingHistory(req, res) {
    const { startDate = new Date('2024-12-01'), endDate = new Date('2025-01-31') } = req.body;
    try {
        const history = await Member.findOne({
            // where: { id: memberId },
            include: [{
                model: Borrowing,
                where: {
                    borrowDate: {
                        [Op.between]: [startDate, endDate]
                    }
                },
                include: [{
                    model: Book,
                    attributes: ['title', 'ISBN'],
                    include: [{
                        model: Author,
                        attributes: ['name'],
                        through: { attributes: [] }
                    }]
                }]
            }]
        });
        return res.json({ success: true, data: history });
    } catch (error) {
        return res.send(500).json({success: false, error: error.message});
    }
}


};



module.exports = memberQueries;
