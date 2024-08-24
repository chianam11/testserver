'use strict';
const { Model, DataTypes } = require('sequelize');

class Role extends Model {
  static associate(models) {
    Role.belongsToMany(models.User, {
      foreignKey: "role_id",
      through: "users_roles",
      as: "users",
    });
    Role.belongsToMany(models.Permission, {
      foreignKey: "role_id",
      through: "role_permissions",
      as: "permissions",
    });
  }
}

module.exports = (sequelize) => {
  Role.init({
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
  }, {
    sequelize,
    tableName: 'roles',
    modelName: "Role",
    underscored: true,
  });

  return Role;
};
