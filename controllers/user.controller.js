const userService = require('../services/user.services');

// Methods to be executed on routes
const createUser = async (req, res)=>{
  try {
    console.log(req.body);
    const user = await userService.createUser(req.body);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating user", Error: error.message });
  }
}

// Export of all methods as object
module.exports = {
  createUser
}