const roleService = require('../services/role.services');
const utils = require('../lib/utils');

// Methods to be executed on routes
const createRole = async (req, res)=>{
  try {
    const role = await roleService.create(req.body);
    res.status(role.success ? 201 : 400).json({
      success: role.success,
      message: role.message,
      data: role.data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating role", Error: error.message });
  }
}

const getRole = async (req, res)=>{
  try {
    const role = await roleService.get(req.params.id);
    res.status(role.success ? 200 : 404).json({
      success: role.success,
      message: role.message,
      data: role.data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching role", Error: error.message });
  }
}

const getAllRole = async (req, res)=>{
  try {
    const role = await roleService.getPagination(req.query.page, req.query.pageSize);
    res.status(role.code).json({
      success: role.success,
      message: role.message,
      data: role.data
    }); 
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching role", Error: error.message });
  }
} 

const updateRole = async (req, res)=>{
  try {
    const role = await roleService.update(req.params.id, req.body);
    res.status(role.code).json({
      success: role.success,
      message: role.message,
      data: role.data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating role", Error: error.message });
  }
}

const deleteRole = async (req, res)=>{
    try {
      const role = await roleService.destroy(req.params.id);
      res.status(role.code).json({
        success: role.success,
        message: role.message,
        data: role.data
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting role", Error: error.message });
  }
}

// Export of all methods as object
module.exports = {
  createRole,
  getRole,
  updateRole,
  deleteRole,
  getAllRole
}