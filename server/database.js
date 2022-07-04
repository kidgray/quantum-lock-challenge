const { Sequelize } = require('sequelize');
const { SEQUELIZE_DB_NAME, SEQUELIZE_USERNAME, SEQUELIZE_PASSWORD } = require('./config');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

module.exports = sequelize;