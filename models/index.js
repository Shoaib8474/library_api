const Book = require('./book');
const Author = require('./author');
const Member = require('./member');
const Borrowing = require('./borrowing');
const Category = require('./category');
const User = require('./loggedUser');

// Define associations
Book.belongsToMany(Author, { through: 'BookAuthors' });
Author.belongsToMany(Book, { through: 'BookAuthors' });

Book.belongsToMany(Category, { through: 'BookCategories' });
Category.belongsToMany(Book, { through: 'BookCategories' });

Book.hasMany(Borrowing);
Borrowing.belongsTo(Book);

Member.hasMany(Borrowing);
Borrowing.belongsTo(Member);

module.exports = {
  Book,
  Author,
  Member,
  Borrowing,
  Category,
  User
};
