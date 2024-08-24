'use strict';
const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static associate(models) {
    User.belongsToMany(models.Role, { through: 'user_roles', foreignKey: 'user_id' });
    User.hasMany(models.UserToken, { foreignKey: 'user_id' });
    User.hasMany(models.Blacklist, { foreignKey: 'user_id' });
  }
}

module.exports = (sequelize) => {
  User.init({
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    type: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    tableName: 'users',
    modelName: "User",
    underscored: true,
  });

  return User;
};
