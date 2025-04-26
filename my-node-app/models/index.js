const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root:admin@localhost:3306/phong_tro_db');  // Thay đổi thông tin kết nối đúng với cơ sở dữ liệu của bạn

const PhongTro = sequelize.define('phongtros', {
  nguoi_thue: {
    type: DataTypes.STRING,
    allowNull: false
  },
  so_dien_thoai: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ngay_bat_dau: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  hinh_thuc_thanh_toan: {
    type: DataTypes.STRING
  },
  ghi_chu: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'phongstros',
  timestamps: true
});

module.exports = { PhongTro };
