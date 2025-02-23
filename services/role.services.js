const db = require('../database/models/index');

const createRole = async (data) => {
  try {
    const role = await db.Role.create(data);
    return role;
  } catch (error) {
    throw error;
  }
};

const getRole = async (id) => {
  try {
    const role = await db.Role.findByPk(id).then(role => {
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

const updateRole = async (id, data) => {
  try {
    const role = await db.Role.update(data, { where: { id } }).then(role => {
      return !role ? {
        success: false,
        message: "Role not found",
        code: 404,
        data: null
      } : {
        success: true,
        message: "Role updated successfully",
        code: 200,
        data: role
      };
    })
      .catch(err => {
        return { success: false, message: "Kesalahan Server!", data: err, code: 500 };
      });
  } catch (error) {
    return { success: false, message: "Role Error. Silahkan Cek Kembali", data: error, code: 500 };
  }
};

module.exports = {
  createRole,
  getRole,
  updateRole
};