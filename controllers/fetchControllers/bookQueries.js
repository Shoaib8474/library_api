// queries/bookQueries.js
const { Sequelize } = require("sequelize");
const { Book, Author, Category, Borrowing, Member } = require("../../models");
const sequelize = require("../../config/database");
const { Op } = require("sequelize");

const bookQueries = {
  // 1.Get all books with their authors and categoriess
  getBooksWithDetails: async (req, res, next) => {
    try {
      const books = await Book.findAll({
        include: [
          {
            model: Author,
            attributes: ["id", "name"],
            through: {
              attributes: [],
            },
          },
          {
            model: Category,
            attributes: ["id", "name"],
            through: {
              attributes: [],
            },
          },
        ],
        order: [["title", "ASC"]],
      });
      return res.json({
        success: true,
        data: books,
      });
    } catch (error) {
      next(error);
    }
  },

  // 2.Get books that are currently borrowed with borrower detail
  async getBorrowedBooks(req, res, next) {
    try {
      const borrowedBooks = await Book.findAll({
        include: [
          {
            model: Borrowing,
            where: {
              status: "borrowed",
              returnDate: null,
            },
            include: [
              {
                model: Member,
                attributes: ["id", "name", "email"],
              },
            ],
          },
          {
            model: Author,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      });
      return res.json({
        success: true,
        data: borrowedBooks,
      });
    } catch (error) {
      next(error);
    }
  },

  // 3.  Get books with low availability
  async getLowStockBooks(req, res, next) {
    const { threshold = 5 } = req.body;
    console.log(threshold);
    try {
      const lowStockBooks = await Book.findAll({
        where: {
          availableQuantity: {
            [Op.lt]: threshold,
          },
        },
        include: [
          {
            model: Author,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
      });
      return res.json({
        success: true,
        data: lowStockBooks,
      });
    } catch (error) {
      next(error);
    }
  },

  // 4. search books by title, or category
  async searchBooks(req, res, next) {
    const { searchTerm = "j" } = req.body;
    console.log(searchTerm);
    try {
      if (!searchTerm) {
        return res.status(400).json({
          success: false,
          error: "Search term is required",
        });
      }

      const books = await Book.findAll({
        // where: sequelize.literal(`Book.title LIKE '%${searchTerm}%'`),
        include: [
          {
            model: Author,
            through: {
              attributes: [],
            },
            required: false,
          },
          {
            model: Category,
            where: {
              name: {
                [Op.like]: `%${searchTerm}%`,
              },
            },
            through: {
              attributes: [],
            },
            required: false,
          },
        ],
        // where: {
        //     [Op.or]: [
        //         { title: { [Op.like]: `%${searchTerm}%` } },
        //         { ISBN: { [Op.like]: `%${searchTerm}%` } }
        //     ]
        // }
      });
      return res.json({
        success: true,
        data: books,
      });
    } catch (error) {
      next(error);
    }
  },

  // 5. get borrowing history with date range
  async getBorrowingHistory(req, res, next) {
    const {
      startDate = new Date("2024-12-01"),
      endDate = new Date("2025-01-31"),
    } = req.body;
    console.log(startDate + " " + endDate);
    try {
      if (!startDate || !endDate) {
        return res.status(400).json({
          success: false,
          error: "Start date and end date are required",
        });
      }
      const history = await Borrowing.findAll({
        where: {
          borrowDate: {
            [Op.between]: [startDate, endDate],
          },
        },
        include: [
          {
            model: Book,
            include: [
              {
                model: Author,
                attributes: ["name"],
                through: {
                  attributes: [],
                },
              },
            ],
          },
          {
            model: Member,
            attributes: ["name", "email"],
          },
        ],
        order: [["borrowDate", "DESC"]],
      });
      return res.json({
        success: true,
        data: history,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = bookQueries;
