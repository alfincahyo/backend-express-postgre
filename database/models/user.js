'use strict';

const {
  Model
} = require('sequelize');
const Role = require('./role');

class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    User.belongsTo(models.Role, {
      foreignKey: 'role_id', // Foreign key in the Post model
      as: 'role', // Alias for the association
    });
  }
}
module.exports = (sequelize, DataTypes) => {
  
  User.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,    // Marks this field as the primary key
      autoIncrement: true, // Enables auto-increment
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateofbirth: DataTypes.DATE,
    gender: DataTypes.STRING,
    address: DataTypes.TEXT,
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  });
  return User;
};