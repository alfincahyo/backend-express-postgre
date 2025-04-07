const db = require('../database/models/index');
const jwt = require('../lib/jwt');

const create = async (data) => {
  try {
    const hashedPassword = await jwt.hash(data.password, 10);
    const user = {
      name: data.name,
      username: data.username,
      password: hashedPassword,
      email: data.email,
      role_id: data.role_id,
      is_active: data.is_active,
      dateofbirth: data.dateofbirth,
      gender: data.gender,
      address: data.address,
      phone: data.phone,
      image: data.image,
      role_id: data.role_id,
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

const get = async (id) => {
  try {
    return await db.User.findByPk(id).then(user => {
      if (!user) {
        throw {
          success: false,
          code: 404,
          message: "User not found",
          data: user
        }
      } else {
        return {
          success: true,
          code: 200,
          message: "User fetched successfully",
          data: user
        }
      }
    })
      .catch(err => {
        throw err;
      });
  } catch (error) {
    throw error;
  }
}

const getPagination = async (page = 1, pageSize = 10) => {
  try {
    const offset = (page - 1) * pageSize;
    const { count, rows: users } = await db.User.findAndCountAll({
      offset,
      pageSize
    });

    return {
      success: true,
      message: "User fetched successfully",
      code: 200,
      data : {
        total: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: parseInt(page),
        rows: users
      }
    };
  } catch (error) {
    throw { success: false, message: "User Error. Silahkan Cek Kembali", data: error, code: 500 };
  }
};

const update = async (id, data) => {
  try {
    const hashedPassword = await jwt.hash(data.password, 10);
    const userData = {
      name: data.name,
      username: data.username,
      password: hashedPassword,
      email: data.email,
      role_id: data.role_id,
      is_active: data.is_active,
      dateofbirth: data.dateofbirth,
      gender: data.gender,
      address: data.address,
      phone: data.phone,
      image: data.image,
      role_id: data.role_id,
    };

    const user = await db.User.findByPk(id);

    if (user === null) {
      throw { success: false, message: "User not found", code: 404, data: null };
    }

    return await db.User.update(userData, { where: { id } }).then(async (user) => {
      const updatedUser = await db.User.findByPk(id);
      return {
        success: true,
        message: "User updated successfully",
        code: 200,
        data: updatedUser
      };
    })
      .catch(err => {
        throw { success: false, message: err.message, data: err, code: 500 };
      });
  } catch (error) {
    throw error;
  }
}

const destroy = async (id) => {
  try {
    const user = await db.User.findByPk(id);

    if (user === null) {
      throw { success: false, message: "User not found", code: 404, data: null };
    }

    return await db.User.destroy({ where: { id }, returning : true }).then(async (user) => {
      return { success: true, message: "User deleted successfully", code: 200, data: user };
    })
      .catch(err => {
        throw { success: false, message: err.message, data: err, code: 500 };
      });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  create,
  update,
  get,
  getPagination,
  destroy
};