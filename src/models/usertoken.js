'use strict';
const { Model, DataTypes } = require('sequelize');

class UserToken extends Model {
  static associate(models) {
    UserToken.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

module.exports = (sequelize) => {
  UserToken.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    refresh_token: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    tableName: 'user_tokens',
    modelName: "UserToken",
    underscored: true,
  });

  return UserToken;
};
