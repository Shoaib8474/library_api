const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book = sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ISBN: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    publishedYear: {
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    availableQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    }
  });
  

module.exports = Book;