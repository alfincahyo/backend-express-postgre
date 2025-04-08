// 3rd Party Modules
const { Router } = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
// Local Modules
const roleController = require('../controllers/role.controller');

// Initialization
const router = Router();

// Requests 
router.get('/', authMiddleware, roleController.getAllRole);
router.post('/', authMiddleware, roleController.createRole);
router.get('/:id', authMiddleware, roleController.getRole);
router.put('/:id', authMiddleware, roleController.updateRole);
router.delete('/:id', authMiddleware, roleController.deleteRole);

module.exports = router;