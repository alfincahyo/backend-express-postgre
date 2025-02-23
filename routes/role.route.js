// 3rd Party Modules
const { Router } = require('express');

// Local Modules
const roleController = require('../controllers/role.controller');

// Initialization
const router = Router();

// Requests 
router.get('/', roleController.getAllRole);
router.post('/', roleController.createRole);
router.get('/:id', roleController.getRole);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);

module.exports = router;