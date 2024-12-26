const { Sequelize, Op, Model } = require("sequelize");
const { Book, Author, Category, Member, Borrowing } = require("../../models");
const sequelize = require("../../config/database");


const borrowingController = {
    // 1. Update borrowing status and return date
    updateBorrowingStatus: async (req, res) => {
        console.log(req)
        try {
            const { borrowingId } = req.query;
            const { status, returnDate = new Date() } = req.body;
            console.log(borrowingId, status );

            // Find the borrowing
            const borrowing = await Borrowing.findOne({
                where: { id: borrowingId },
                include: [{ model: Book }]
            });

            if (!borrowing) {
                return res.status(400).json({
                    success: false,
                    message: 'Borrowing not found'
                });
            }

            // If returning the book, update the book's available quantity
            if (status === 'returned' && borrowing.status === 'borrowed') {
                await Book.increment('availableQuantity', {
                    by: 1,
                    where: { id: borrowing.Book.id }
                });
            }
            
            // Update the borrowing
            await borrowing.update({
                status,
                returnDate: status === 'returned' ? (returnDate || new Date()) : null
            });

            return res.json({
                success: true,
                data: borrowing,
                message: 'Borrowing updated successfully'
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },




}


module.exports = borrowingController