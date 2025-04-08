// 3rd Party Modules
const { Router } = require('express');

// Local Modules
const authController = require('../controllers/auth.controller');

// Initialization
const router = Router();

// Requests 
router.post('/', authController.login);

module.exports = router;