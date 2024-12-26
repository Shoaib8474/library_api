const bcrypt = require('bcrypt');
const sequelize = require('../../config/database');
const { User } = require('../../models');

const JWT_SECRET = 'secret_key';


const register = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      console.log(req.body);


      //Check User already exist or not
      const record = await User.findOne({
        where: {email: req.body.email}
      })
      
      if(record){
         res.status(400).json({success: false, error: "User already exist, use different email_id"});
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create user on auth_users table
      const user = await User.create({
        username,
        email,
        password: hashedPassword
      });

      res.status(201).json({ message: 'User registered successfully', userInfo:user });
    } catch (error) {
      next(error)
    }
  };

  module.exports = register;