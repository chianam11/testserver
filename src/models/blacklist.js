'use strict';
const { Model, DataTypes } = require('sequelize');

class Blacklist extends Model {
  static associate(models) {
    Blacklist.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

module.exports = (sequelize) => {
  Blacklist.init({
    refresh_token: DataTypes.STRING,
  }, {
    sequelize,
    tableName: 'blacklists',
    modelName: "Blacklist",
    underscored: true,
  });

  return Blacklist;
};
