const db = require('../database/models/index');

const createUser = async (data) => {
  try {
    const user = await db.User.create(data);
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
};