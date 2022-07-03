const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { Sequelize } = require('sequelize');
const { SEQUELIZE_DB_NAME, SEQUELIZE_USERNAME, SEQUELIZE_PASSWORD } = require('./config.js');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const app = express();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(bodyParser.json());

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established. . .');
        app.listen(port, () => {
            console.log(`Server listening on port ${port}. . .`);
        });
    } catch (error) {
        console.error(`Failed to connect to database: ${error}`);
    }
})();