const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Member = sequelize.define('Member', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    membershipDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    status: {
      type: DataTypes.ENUM('active', 'expired'),
      defaultValue: 'active'
    }
  });
  

module.exports = Member;