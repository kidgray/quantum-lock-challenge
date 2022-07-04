const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./database');
const { User, Post, User_Follower } = require('./models/index.js');

const app = express();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(bodyParser.json());

// Get all users (This is purely for demo/testing purposes, as it would be unwieldy and of questionable utility in production)
app.get('/users', (req, res) => {
    User
    .findAll()
    .then((data) => {
        console.log(data);
        res.send(data);
    });
});

app.get('/users/:userId', (req, res) => {
    User.
    findOne({
        where: {
            id: req.params.userId
        }
    })
    .then((user) => {
        user.getSiblings();
    });
});

// Create a user
app.post('/users', (req, res) => {
    console.log(User.associations);
    User
    .create(req.body)
    .then((data) => {
        //console.log(data);
        res.send(`User has been created.`)
    });
});

// Get all posts (Could be useful for some kind of Feed or "wall")
app.get('/posts', (req, res) => {
    Post
    .findAll()
    .then((data) => {
        console.log(data);
        res.send(data);
    });
});

// Get all posts by a given User (could be useful for a Search or Filter feature)
app.get('/posts/:userId', (req, res) => {
    Post
    .findAll({
        where: {
            user_id: req.params.userId
        }
    })
    .then((data) => {
        console.log(data);
        res.send(data);
    })
})

// Make a post
app.post('/posts', (req, res) => {
    Post
    .create(req.body)
    .then((data) => {
        console.log(data);
        res.send(`Message has been posted.`);
    });
});

// Get all of a user's followers
app.get('/follow/:userId', (req, res) => {
    User
    .findAll({
        include: {
            model: User,
            as: 'follower'
        },
        // where: {
        //     id: req.params.userId
        // }
    })
    .then((data) => {
        console.log(data);
        res.send(data);
    })
});

app.post('/follow/:userId', (req, res) => {
    User_Follower
    .create(req.body)
    .then((data) => {
        console.log(data);
        res.send(`User has been successfully followed.`);
    });
});

(async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Database connection established. . .');
        app.listen(port, () => {
            console.log(`Server listening on port ${port}. . .`);
        });
    } catch (error) {
        console.error(`Failed to connect to database: ${error}`);
    }
})();