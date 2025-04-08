const db = require('../database/models/index');
const { Op, Sequelize } = require('sequelize');
const jwt = require('../lib/jwt');

const login = async (payload) => {
  try {
    const user = await db.User.findOne({
      where: {
        [Op.or]: [
          { username: payload.username },
          { email: payload.email }
        ]
      }
    })

    if (!user) {
      throw {
        success: false,
        code: 400,
        message: "Username or email is incorrect!",
        data: null
      };  
    }

    const token = await jwt.sign({
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
    });

    return {
      success: true,
      code: 200,
      message: "Login successful",
      data: {
        token: token
      }
    };
    
  } catch (error) {
    throw error;
  }
}

module.exports = {
  login
}