const express = require('express');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./database');
const auth = require('./auth');
const { User, Post } = require('./models/index.js');

dotenv.config();
const app = express();
const port = process.env.PORT || 5050;

app.use(cors());
app.use(bodyParser.json());

// Log in and authentication
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).send(`Please fill out all input fields.`);
    }

    // Check whether user exists
    const user = await User.findOne({
        where: {
            email: email
        }
    });

    // Check whether password is correct
    const correctPassword = await bcrypt.compare(password, user.password);

    if (user && correctPassword) {
        const token = createToken(user.id, user.email);
        user.token = token;

        // Use this to test the Post creation functionality
        console.log(`JWT Token: ${token}`);

        res.send(user);
        return;
    }

    return res.status(400).send(`Invalid credentials.`);
});

// Create a user
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Basic input validation
    if (!username || !email || !password) {
        res.status(400).send(`Please fill out all input fields.`);
    }

    // Check whether the user already exists
    const existingUser = await User.findOne({
        where: {
            email: email
        }
    });

    if (existingUser) {
        res.status(400).send(`A user with that email address already exists. Please log in.`);
        return;
    }

    // Basic password encryption with bcrypt
    req.body.password = await encryptPassword(password);

    const newUser = await User.create(req.body);
    res.send(newUser);
});

// Get all users (This is purely for demo/testing purposes, as it would be unwieldy and of questionable utility in production)
app.get('/users', (req, res) => {
    User
    .findAll()
    .then((users) => {
        res.send(users);
    });
});

// Get a user by Id
app.get('/users/:userId', async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.userId
        }
    });
    
    res.send(user);
});

// Get all posts (Could be useful for some kind of Feed or "wall")
app.get('/posts', async (req, res) => {
    const posts = await Post.findAll();

    res.send(posts);
});

// Get all posts by a given User (could be useful for a Search or Filter feature)
app.get('/posts/:userId', async (req, res) => {
    const posts = await Post.findAll({
        where: {
            user_id: req.params.userId
        }
    });

    res.send(posts);
})

// Make a post
app.post('/posts/:userId', auth, async(req, res) => {
    const newPost = await Post.create(req.body);

    res.send(newPost);
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

/* Auxiliary Functions */

async function encryptPassword(password) {
    // 10 is an arbitrary number here, just for simplicity's sake
    const salt = 10;
    const encryptedPassword = await bcrypt.hash(password, salt);
    return encryptedPassword;
}

function createToken(userId, userEmail) {
    const token = jwt.sign(
        { userId, userEmail },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: '12h'
        }
    );
    return token;
}