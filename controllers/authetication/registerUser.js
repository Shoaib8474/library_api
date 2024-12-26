const bcrypt = require('bcrypt');
const sequelize = require('../../config/database');
const { User } = require('../../models');

const JWT_SECRET = 'secret_key';


const register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      console.log(req.body);
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create user on auth_users table
      const user = await User.create({
        username,
        email,
        password: hashedPassword
      });
      
      res.status(201).json({ message: 'User registered successfully', userInfo:user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = register;