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
    httpLogger.error('Error creating user', error);
    res.status(500).json({ success: false, message: "Error creating user", Error: error.message });
  }
}

// Export of all methods as object
module.exports = {
  createUser
}