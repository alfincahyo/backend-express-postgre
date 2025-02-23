const roleService = require('../services/role.services');

// Methods to be executed on routes
const createRole = async (req, res)=>{
  try {
    const role = await roleService.createRole(req.body);
    res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: role
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating role", Error: error.message });
  }
}

const getRole = async (req, res)=>{
  try {
    const role = await roleService.getRole(req.params.id);
    res.status(role.success ? 200 : 404).json({
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
    const role = await roleService.updateRole(req.params.id, req.body);
    res.status(role.code).json({
      success: role.success,
      message: role.message,
      data: role.data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating role", Error: error.message });
  }
}

// Export of all methods as object
module.exports = {
  createRole,
  getRole,
  updateRole
}