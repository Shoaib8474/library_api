const { Sequelize, Op, Model } = require("sequelize");
const { Book, Author, Category, Member, Borrowing } = require("../../models");
const sequelize = require("../../config/database");

const authorQueries = {
  // 1. Finding Authors with Specific Publication Counts
  authorWithPublicationCount: async (req, res) => {
    try {
      const prolificAuthors = await Author.findAll({
        attributes: {
          include: [
            [sequelize.fn("COUNT", sequelize.col("books.id")), "bookCount"],
          ],
        },
        include: [
          {
            model: Book,
            attributes: [],
            through: { attributes: [] },
            required: false,
          },
        ],
        group: ["Author.id"],
        // having: sequelize.literal('bookCount >= 2'),
        raw: true,
      });
      //   console.log('Authors with 2 or more books:', prolificAuthors);
      return res.json({
        success: true,
        data: prolificAuthors,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  },

  // 2) Finding Books with search term
  authorWithSpecificGenre: async (req, res) => {
    const { searchTerm = "Fiction" } = req.body;
    try {
      const authors = await Author.findAll({
        include: [
          {
            model: Book,
            include: [
              {
                model: Category,
                where: {
                  [Op.and]: [
                    sequelize.literal(`books.publishedYear <= 1997`),
                    { name: { [Op.like]: `%${searchTerm}%` } },
                    // { '$books.publishedYear$': { [Op.eq]: 1997} }
                  ],
                },
                through: { attributes: [] },
              },
            ],
          },
        ],
        required: true,
      });
      //   console.log(JSON.stringify(authors, null, 2));
      return res.json({
        success: true,
        data: authors,
      });
    } catch (error) {
        return res.send({ success: false, error: error.message });
    }
  },


};



// authorQueries.authorWithSpecificGenre();

module.exports = authorQueries;
