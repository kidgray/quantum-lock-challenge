const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');

class User_Follower extends Model {}

User_Follower.init({}, {
    sequelize,
    modelName: 'user_follower',
});

module.exports = User_Follower;