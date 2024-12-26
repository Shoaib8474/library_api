const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/database');
const { User } = require('../../models');

const JWT_SECRET = 'secret_key';


const login =  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      console.log(req.body)
      
      // Find user by email_is
      const user = await User.findOne({ where: { email } });
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email }, 
        JWT_SECRET, 
        { expiresIn: '1h' }
      );
      
      res.json({ token });
    } catch (error) {
      next(error)
    }
  };


  
  module.exports = login;