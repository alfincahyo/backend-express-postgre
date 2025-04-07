const roleService = require('../services/role.services');
const utils = require('../lib/utils');
const { httpLogger, formatHTTPLoggerResponse } = require('../lib/logger');

// Methods to be executed on routes
const createRole = async (req, res)=>{
  try {
    const role = await roleService.create(req.body);
    httpLogger.info('Success creating role', formatHTTPLoggerResponse(req, res, role));
    res.status(role.code).json({
      success: role.success,
      message: role.message,
      data: role.data
    });
  } catch (error) {
    httpLogger.error('Error creating role', error);
    res.status(error.code).json({ success: false, message: "Error creating role", Error: error.message });
  }
}

const getRole = async (req, res)=>{
  try {
    const role = await roleService.get(req.params.id);
    httpLogger.info('Success fetching role', formatHTTPLoggerResponse(req, res, role));
    res.status(role.code).json({
      success: role.success,
      message: role.message,
      data: role.data
    });
  } catch (error) {
    httpLogger.error('Error fetching role', error);
    res.status(error.code).json({ success: false, message: "Error fetching role", Error: error.message });
  }
}

const getAllRole = async (req, res)=>{
  try {
    const role = await roleService.getPagination(req.query.page, req.query.pageSize);
    httpLogger.info('Success fetching role', formatHTTPLoggerResponse(req, res, role));
    res.status(role.code).json({
      success: role.success,
      message: role.message,
      data: role.data
    }); 
  } catch (error) {
    httpLogger.error('Error fetching role', error);
    res.status(500).json({ success: false, message: "Error fetching role", Error: error.message });
  }
} 

const updateRole = async (req, res)=>{
  try {
    const role = await roleService.update(req.params.id, req.body);
    httpLogger.info('Success updating role', formatHTTPLoggerResponse(req, res, role));
    res.status(role.code).json({
      success: role.success,
      message: role.message,
      data: role.data
    });
  } catch (error) {
    httpLogger.error('Error updating role', error);
    res.status(error.code).json({ success: false, message: "Error updating role", Error: error.message });
  }
}

const deleteRole = async (req, res)=>{
    try {
      const role = await roleService.destroy(req.params.id);
      httpLogger.info('Success deleting role', formatHTTPLoggerResponse(req, res, role));
      res.status(role.code).json({
        success: role.success,
        message: role.message,
        data: role.data
      });
  } catch (error) {
    // httpLogger.error('Error deleting role', error);
    console.log(error);
    res.status(error.code).json({ success: false, message: "Error deleting role", Error: error.message });
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