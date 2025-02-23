// 3rd Party Modules
const { Router } = require('express');

// Local Modules
const userController = require('../controllers/user.controller');

// Initialization
const router = Router();

// Requests 
router.post('/', userController.createUser);

module.exports = router;