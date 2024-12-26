const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// const User = require('../models/Person');
const sequelize = require('../../config/database');
const { User } = require('../../models');

const JWT_SECRET = 'secret_key';


const updatePassword = async (req, res) => {
    try {
      const { email, password, newPassword } = req.body;
      console.log(req.body);
  
      // Find user by email
      const person = await User.findOne({ where: { email } });
  
      if (!person) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Check if the current password matches
      const isMatch = await bcrypt.compare(password, person.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Hash the new password and update
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.update(
        { password: hashedPassword },
        { where: { email } }
      );
      console.log("Password is updated successfully");
  
      // Generate JWT token
      const token = jwt.sign(
        { id: person.id, email: person.email },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({ token });
    } catch (error) {
      res.status(500).json({ value: "@", error: error.message });
    }
  };
  
  module.exports = updatePassword;
  