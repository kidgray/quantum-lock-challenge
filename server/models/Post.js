const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Post extends Model {}

Post.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName: 'post'
});

module.exports = Post;