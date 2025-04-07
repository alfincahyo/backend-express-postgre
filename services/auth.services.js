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

  } catch (error) {
    throw error;
  }
}

module.exports = {
  login
}