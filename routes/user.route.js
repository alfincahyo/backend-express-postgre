// 3rd Party Modules
const { Router } = require('express');

// Local Modules
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Initialization
const router = Router();

// Requests 
router.post('/', authMiddleware, userController.createUser);
router.put('/:id', authMiddleware, userController.updateUser);
router.get('/:id', authMiddleware, userController.getUser);
router.get('/', authMiddleware, userController.getAllUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;