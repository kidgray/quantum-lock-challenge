const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const User = require('./User');

class User_Follower extends Model {}

User_Follower.init({
    // follower_id: {
    //     type: DataTypes.INTEGER
    // },
    // followed_id: {
    //     type: DataTypes.INTEGER
    // }
}, {
    sequelize,
    modelName: 'user_follower',
});

module.exports = User_Follower;