const db = require('../database/models/index');

const create = async (data) => {
  try {
    return await db.Role.create(data).then(role => {
      return {
        success: true,
        message: "Role created successfully",
        data: role
      };
    }).catch(err => {
      return {
        success: false,
        message: "Error creating role!",
        data: err.message
      };
    });
  } catch (error) {
    throw error;
  }
};

const get = async (id) => {
  try {
    return await db.Role.findByPk(id).then(role => {
      return !role ? {
        success: false,
        message: "Role not found",
        data: null
      } : {
        success: true,
        message: "Role fetched successfully",
        data: role
      };
    })
      .catch(err => {
        return { success: false, message: "Kesalahan Server!", data: err };
      });
  } catch (error) {
    return { success: false, message: "Role Error. Silahkan Cek Kembali", data: error };
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
    return { success: false, message: "Role Error. Silahkan Cek Kembali", data: error.message, code: 500 };
  }
};

const update = async (id, data) => {
  try {
    const role = await db.Role.findByPk(id);

    if (role === null) {
      return { success: false, message: "Role not found", code: 404, data: null };
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
        return { success: false, message: "Kesalahan Server!", data: err, code: 500 };
      });
  } catch (error) {
    return { success: false, message: "Role Error. Silahkan Cek Kembali", data: error, code: 500 };
  }
};

const destroy = async (id) => {
  try {
    const role = await db.Role.findByPk(id);

    if (role === null) {
      return { success: false, message: "Role not found", code: 404, data: null };
    }

    return await db.Role.destroy({ where: { id } }).then(async (role) => {
      return { success: true, message: "Role deleted successfully", code: 200, data: null };
    })
      .catch(err => {
        return { success: false, message: "Kesalahan Server!", data: err, code: 500 };
      });
  } catch (error) {
    return { success: false, message: "Role Error. Silahkan Cek Kembali", data: error, code: 500 };
  }
}

module.exports = {
  create,
  get,
  update,
  destroy,
  getPagination
};