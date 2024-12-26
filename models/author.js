const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Author = sequelize.define('Author', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  biography: {
    type: DataTypes.TEXT
  }
});

module.exports = Author;