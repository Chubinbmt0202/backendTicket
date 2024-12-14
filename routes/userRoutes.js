const express = require('express');
const { loginAdmin, createUser, updateUser, deleteUser } = require('../controller/userController');
const router = express.Router();

router.post('/login', loginAdmin);
router.post('/createUser', createUser);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);
// Định nghĩa các route khác

module.exports = router;
