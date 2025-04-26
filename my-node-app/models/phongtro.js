module.exports = (sequelize, DataTypes) => {
  const PhongTro = sequelize.define('PhongTro', {
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
      type: DataTypes.STRING,
    },
    ghi_chu: {
      type: DataTypes.TEXT,
    }
  }, {
    tableName: 'phong_tro',
    timestamps: true, // tự động quản lý createdAt và updatedAt
  });
  return PhongTro;
};
