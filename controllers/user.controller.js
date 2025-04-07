const userService = require('../services/user.services');
const { httpLogger, formatHTTPLoggerResponse } = require('../lib/logger');

// Methods to be executed on routes
const createUser = async (req, res)=>{
  try {
    const user = await userService.create(req.body);
    httpLogger.info('Success creating user', formatHTTPLoggerResponse(req, res, user));
    res.status(user.code).json({
      success: user.success,
      message: user.message,
      data: (user.success ? user.data : user.data.errors[0].message)
    });
  } catch (error) {
    httpLogger.error('Error creating user', formatHTTPLoggerResponse(req, res, error));
    res.status(error.code).json({ success: false, message: "Error creating user", Error: error.message });
  }
}

const getUser = async (req, res)=>{
  try {
    const user = await userService.get(req.params.id);
    httpLogger.info('Success fetching user', formatHTTPLoggerResponse(req, res, user));
    res.status(user.code).json({
      success: user.success,
      message: user.message,
      data: user.data
    });
  } catch (error) {
    httpLogger.error('Error fetching user', formatHTTPLoggerResponse(req, res, error));
    res.status(error.code).json({ success: false, message: "Error fetching user", Error: error.message });
  }
}

const getAllUser = async (req, res)=>{
  try {
    const user = await userService.getPagination(req.query.page, req.query.pageSize);
    httpLogger.info('Success fetching user', formatHTTPLoggerResponse(req, res, user));
    res.status(user.code).json({
      success: user.success,
      message: user.message,
      data: user.data
    }); 
  } catch (error) {
    httpLogger.error('Error fetching user', formatHTTPLoggerResponse(req, res, error));
    res.status(500).json({ success: false, message: "Error fetching user", Error: error.message });
  }
} 

const updateUser = async (req, res)=>{
  try {
    const user = await userService.update(req.params.id, req.body);
    httpLogger.info('Success updating user', formatHTTPLoggerResponse(req, res, user));
    res.status(user.code).json({
      success: user.success,
      message: user.message,
      data: user.data
    });
  } catch (error) {
    httpLogger.error('Error updating user', formatHTTPLoggerResponse(req, res, error));
    res.status(error.code).json({ success: false, message: "Error updating user", Error: error.message });
  }
}

const deleteUser = async (req, res)=>{
  try {
    const user = await userService.destroy(req.params.id);
    httpLogger.info('Success deleting user', formatHTTPLoggerResponse(req, res, user));
    res.status(user.code).json({
      success: user.success,
      message: user.message,
      data: user.data
    });
} catch (error) {
    httpLogger.error('Error deleting role', formatHTTPLoggerResponse(req, res, error));
    res.status(error.code).json({ success: false, message: "Error deleting user", Error: error.message });
  }
}

// Export of all methods as object
module.exports = {
  createUser,
  updateUser,
  getUser,
  getAllUser,
  deleteUser
}