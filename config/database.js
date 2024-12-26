const Sequelize = require('sequelize');

const sequelize = new Sequelize('library_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
});

module.exports = sequelize;