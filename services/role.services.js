const db = require('../database/models/index');

const create = async (data) => {
  try {
    return await db.Role.create(data).then(role => {
      return {
        success: true,
        code: 201,
        message: "Role created successfully",
        data: role
      };
    }).catch(err => {
      throw {
        success: false,
        code: 400,
        message: err.message,
        data: err
      };
    });
  } catch (error) {
    throw error;
  }
};

const get = async (id) => {
  try {
    return await db.Role.findByPk(id).then(role => {
      if(!role){
        throw {
          success: false,
          code: 404,
          message: "Role not found",
          data: role
        }
      }else{
        return {
          success: true,
          code: 200,
          message: "Role fetched successfully",
          data: role
        }
      }
    })
      .catch(err => {
        throw err;
      });
  } catch (error) {
    throw error;
  }
};

const getPagination = async (page = 1, pageSize = 10) => {
  try {
    const offset = (page - 1) * pageSize;
    const { count, rows: roles } = await db.Role.findAndCountAll({
      offset,
      pageSize
    });

    return {
      success: true,
      message: "Role fetched successfully",
      code: 200,
      data : {
        total: count,
        totalPages: Math.ceil(count / pageSize),
        currentPage: parseInt(page),
        rows: roles
      }
    };
  } catch (error) {
    throw { success: false, message: "Role Error. Silahkan Cek Kembali", data: error, code: 500 };
  }
};

const update = async (id, data) => {
  try {
    const role = await db.Role.findByPk(id);

    if (role === null) {
      throw { success: false, message: "Role not found", code: 404, data: null };
    }

    return await db.Role.update(data, { where: { id } }).then(async (role) => {
      const updatedRole = await db.Role.findByPk(id);
      return {
        success: true,
        message: "Role updated successfully",
        code: 200,
        data: updatedRole
      };
    })
      .catch(err => {
        throw { success: false, message: err.message, data: err, code: 500 };
      });
  } catch (error) {
    throw error;
  }
};

const destroy = async (id) => {
  try {
    const role = await db.Role.findByPk(id);

    if (role === null) {
      throw { success: false, message: "Role not found", code: 404, data: null };
    }

    return await db.Role.destroy({ where: { id }, returning : true }).then(async (role) => {
      return { success: true, message: "Role deleted successfully", code: 200, data: role };
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
  get,
  update,
  destroy,
  getPagination
};