const express = require('express');
const { loginAdmin, createUser, updateUser, deleteUser } = require('../controller/userController');
const { getLocation } = require('../controller/location');
const { addTuyenXe, getAllTuyenXe, deleteTuyenXe, updateTuyenXe } = require('../controller/tuyenXeController');
const router = express.Router();

router.post('/login', loginAdmin);
router.post('/createUser', createUser);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser);
// Định nghĩa các route khác

// lấy địa điểm
router.get('/location', getLocation);

//tuyến xe
router.post('/tuyenXe', addTuyenXe);
router.get('/AlltuyenXe', getAllTuyenXe);
router.delete('/deleteTuyenXe/:id', deleteTuyenXe);
router.put('/updateTuyenXe/:id', updateTuyenXe);

module.exports = router;
