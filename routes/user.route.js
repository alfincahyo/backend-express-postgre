// 3rd Party Modules
const { Router } = require('express');

// Local Modules
const userController = require('../controllers/user.controller');

// Initialization
const router = Router();

// Requests 
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.get('/:id', userController.getUser);
router.get('/', userController.getAllUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;