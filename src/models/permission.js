'use strict';
const { Model, DataTypes } = require('sequelize');

class Permission extends Model {
  static associate(models) {
    Permission.belongsToMany(models.Role, {
      foreignKey: "permission_id",
      through: "role_permissions",
      as: "roles",
    });
  }
}

module.exports = (sequelize) => {
  Permission.init({
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  }, {
    sequelize,
    tableName: 'permissions',
    modelName: "Permission",
    underscored: true,
  });

  return Permission;
};
