const { Book, Author, Category, Member, Borrowing } = require('../models');
const sequelize = require('../config/database');

const seedDatabase = async () => {
    try {
        // Create Categories
        const categories = await Category.bulkCreate([
            { name: 'Fiction', description: 'Literary works created from imagination' },
            { name: 'Non-Fiction', description: 'Factual and informative works' },
            { name: 'Science Fiction', description: 'Fictional works based on scientific discoveries' },
            { name: 'Mystery', description: 'Works involving crime or mystery solving' },
            { name: 'Biography', description: 'Account of someone\'s life' }
        ]);

        // Create Authors
        const authors = await Author.bulkCreate([
            { 
                name: 'George Orwell',
                biography: 'English novelist known for political commentary'
            },
            {
                name: 'J.K. Rowling',
                biography: 'British author best known for Harry Potter series'
            },
            {
                name: 'Stephen King',
                biography: 'American author of horror and suspense novels'
            },
            {
                name: 'Agatha Christie',
                biography: 'British mystery novelist'
            }
        ]);

        // Create Books
        const books = await Book.bulkCreate([
            {
                title: '1984',
                ISBN: '978-0451524935',
                publishedYear: 1949,
                quantity: 5,
                availableQuantity: 3
            },
            {
                title: 'Harry Potter and the Philosopher\'s Stone',
                ISBN: '978-0747532699',
                publishedYear: 1997,
                quantity: 8,
                availableQuantity: 6
            },
            {
                title: 'The Shining',
                ISBN: '978-0307743657',
                publishedYear: 1977,
                quantity: 4,
                availableQuantity: 4
            },
            {
                title: 'Murder on the Orient Express',
                ISBN: '978-0007119318',
                publishedYear: 1934,
                quantity: 6,
                availableQuantity: 5
            }
        ]);

        // Create Members
        const members = await Member.bulkCreate([
            {
                name: 'John Doe',
                email: 'john.doe@example.com',
                status: 'active',
                membershipDate: new Date()
            },
            {
                name: 'Jane Smith',
                email: 'jane.smith@example.com',
                status: 'active',
                membershipDate: new Date()
            },
            {
                name: 'Bob Johnson',
                email: 'bob.johnson@example.com',
                status: 'active',
                membershipDate: new Date()
            }
        ]);

        // Create Borrowings
        const borrowings = await Borrowing.bulkCreate([
            {
                BookId: books[0].id,
                MemberId: members[0].id,
                borrowDate: new Date(),
                dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
                status: 'borrowed'
            },
            {
                BookId: books[1].id,
                MemberId: members[1].id,
                borrowDate: new Date(),
                dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                status: 'borrowed'
            }
        ]);

        // Set up Book-Author associations
        await Promise.all([
            books[0].setAuthors([authors[0]]),
            books[1].setAuthors([authors[1]]),
            books[2].setAuthors([authors[2]]),
            books[3].setAuthors([authors[3]])
        ]);

        // Set up Book-Category associations
        await Promise.all([
            books[0].setCategories([categories[0], categories[2]]),
            books[1].setCategories([categories[0]]),
            books[2].setCategories([categories[0], categories[3]]),
            books[3].setCategories([categories[0], categories[3]])
        ]);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
        throw error;
    }
};



const runSeeder = async () => {
    try {
        await sequelize.sync({ force: true }); 
        
        // Run the seeder
        await seedDatabase();
        
        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error running seeder:', error);
        process.exit(1);
    }
};


if (require.main === module) {
    runSeeder();
}

module.exports = seedDatabase;