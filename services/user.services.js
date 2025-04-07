const db = require('../database/models/index');
const jwt = require('../lib/jwt');

const create = async (payload) => {
  try {
    const hashedPassword = await jwt.hash(payload.password, 10);
    const user = {
      name: payload.name,
      username: payload.username,
      password: hashedPassword,
      email: payload.email,
      role_id: payload.role_id,
      is_active: payload.is_active,
      dateofbirth: payload.dateofbirth,
      gender: payload.gender,
      address: payload.address,
      phone: payload.phone,
      image: payload.image,
      role_id: payload.role_id,
    }

    return await db.User.create(user).then(user => {
      return {
        success: true,
        code: 201,
        message: "User created successfully",
        data: user
      };
    }).catch(err => {
      throw {
        success: false,
        code: 400,
        message: "Error creating user!",
        data: err
      };
    });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
};