# library_api
## Feature
- Complete book management system
- JWT authentication
- Borrowing tracking
- Category management
- Authors management
- Updating borrowing status with related book quantity

## Seed the database:
node databaseSeeder.js
 {
    "bcrypt": "^5.1.1",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2",
    "mysql2": "^3.11.5",
    "sequelize": "^6.37.5"
 }

## Dependencies:

### Authentication API Endpoints
const auth = require('./routes/authetication/registrationLogin.route');

router.post('/register', register);
router.post('/login', login);

## 1. Register:
POST  http://localhost:3000/api/register
{
    "email": "st.john@gmail.com",
    "password": "password123"
}

## 2. Login:
POST  http://localhost:3000/api/login
{
    "email": "st.john@gmail.com",
    "password": "password123"
}
