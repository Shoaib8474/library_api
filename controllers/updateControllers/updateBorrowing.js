const { Sequelize, Op, Model } = require("sequelize");
const { Book, Author, Category, Member, Borrowing } = require("../../models");
const sequelize = require("../../config/database");

const borrowingController = {
  // 1. Update borrowing status and return date
  updateBorrowingStatus: async (req, res, next) => {
    console.log(req);
    try {
      const { borrowingId } = req.query;
      const { status="returned", returnDate=new Date() } = req.body;
      console.log(borrowingId, status);

      // Find the borrowing
      const borrowing = await Borrowing.findOne({
        where: { id: borrowingId },
        include: [{ model: Book }],
      });

      {console.log(borrowing.status)}

      if(borrowing.status = "returned"){
        const error = new Error('Book already returned')
        return next(error);
      }
      // If returning the book, update the book's available quantity
      if (status === "returned" && borrowing.status === "borrowed") {
        await Book.increment("availableQuantity", {
          by: 1,
          where: { id: borrowing.Book.id },
        });
      }

      // Update the borrowing
      await borrowing.update({
        status,
        returnDate: status === "returned" ?  new Date(returnDate) : null,
      });

      return res.json({
        success: true,
        data: borrowing,
        message: "Borrowing updated successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = borrowingController;
