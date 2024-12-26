const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Borrowing = sequelize.define('Borrowing', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  borrowDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  returnDate: {
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.ENUM('borrowed', 'returned', 'overdue'),
    defaultValue: 'borrowed'
  }
});

module.exports = Borrowing;