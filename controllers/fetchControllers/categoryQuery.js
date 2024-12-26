const { Sequelize, Op } = require("sequelize");
const { Book, Author, Category, Member, Borrowing } = require("../../models");
const sequelize = require("../../config/database");

const categoryQuery = {
  // 1. Get category with its books and their authors
  getCategoryWithDetails: async (req, res, next) => {
    try {
      const categories = await Category.findAll({
        include: [
          {
            model: Book,
            include: [
              {
                model: Author,
                through: { attributes: [] },
              },
            ],
            through: { attributes: [] },
          },
        ],
      });
      return res.json({ success: true, data: categories });
    } catch (error) {
      next(error);
    }
  },

  // 2. Find categories that have books with available copies
  getCategoriesWithAvailableBooks: async (req, res, next) => {
    try {
      const categories = await Category.findAll({
        attributes: [
          "name",
          [Sequelize.fn("COUNT", Sequelize.col("books.id")), "bookCount"],
        ],
        include: [
          {
            model: Book,
            attributes: [],
            where: {
              availableQuantity: {
                [Op.gt]: 0,
              },
            },
            through: { attributes: [] },
          },
        ],
        having: sequelize.literal("COUNT(Books.id) > 0"),
        group: ["Category.id"],
        // group: ['Category.id', 'Books.id']
      });
      return res.json({ success: true, data: categories });
    } catch (error) {
      next(error);
    }
  },

  // 3. Search books in a specific category by title or author
  searchBooksInCategory: async (req, res, next) => {
    try {
      const results = await Category.findOne({
        // where: { id: categoryId },
        include: [
          {
            model: Book,
            where: {
              [Op.or]: [{ title: { [Op.like]: `%${searchTerm}%` } }],
            },
            include: [
              {
                model: Author,
                through: { attributes: [] },
              },
            ],
            through: { attributes: [] },
          },
        ],
      });
      return res.json({ success: true, data: results });
    } catch (error) {
      next(error);
    }
  },

  // 4. Get most popular categories (based on book borrowings)
  getPopularCategories: async (req, res, next) => {
    try {
      const categories = await Category.findAll({
        include: [
          {
            model: Book,
            attributes: [],

            include: [
              {
                model: Borrowing,
                attributes: [],
              },
            ],
            through: { attributes: [] },
          },
        ],

        attributes: [
          "id",
          "name",
          [
            sequelize.fn("COUNT", sequelize.col(`books->borrowings.id`)),
            "borrowCount",
          ],
        ],
        group: ["Category.id"],
        order: [[sequelize.literal("borrowCount"), "DESC"]],
        // limit: 4  dot
      });
      return res.json({ success: true, data: categories });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = categoryQuery;
