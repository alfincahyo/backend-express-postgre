// 3rd Party Modules
const { Router } = require('express');

// Local Modules
const roleController = require('../controllers/role.controller');

// Initialization
const router = Router();

// Requests 
router.post('/', roleController.createRole);
router.get('/:id', roleController.getRole);

module.exports = router;