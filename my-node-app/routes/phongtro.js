const express = require('express');
const router = express.Router();
const { PhongTro } = require('../models');  // Đảm bảo đúng đường dẫn và mô hình Sequelize

// Lấy tất cả phòng trọ
router.get('/', async (req, res) => {
  try {
    const phongTroList = await PhongTro.findAll();
    res.json(phongTroList);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

// Thêm phòng trọ mới
router.post('/', async (req, res) => {
  try {
    const { nguoi_thue, so_dien_thoai, ngay_bat_dau, hinh_thuc_thanh_toan, ghi_chu } = req.body;
    const newPhongTro = await PhongTro.create({ nguoi_thue, so_dien_thoai, ngay_bat_dau, hinh_thuc_thanh_toan, ghi_chu });
    res.status(201).json(newPhongTro);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
});

module.exports = router;
