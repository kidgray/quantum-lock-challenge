# Basic Social Media App Backend Challenge

This is a programming challenge that involves designing a basic back-end for a social media app such as Twitter, Facebook, etc.

As per the assignment specifications, 2 basic services will be included: authentication and messages (posts and retrievals). The ability of users to follow and be followed
by other users will be taken into consideration.

# Table of contents
- [Table of contents](#table-of-contents)
- [Installation](#installation)
- [Diagram](#diagram)
- [Schema](#schema)
- [Explanation](#explanation)
- [Usage](#usage)
- [Q&A](#q%20&%20a)

# Installation
[(Back to top)](#table-of-contents)

Navigate to the directory in which you want to install the project, then run the following command:

```git clone https://github.com/kidgray/quantum-lock-challenge.git```

To install the project dependencies, navigate to the root directory of the cloned project and use
the following command:

```yarn install```

NOTE: This project uses the following ports:

    Server: Port 5050

Please make sure these ports are available for use prior to executing it.

You may start the server by navigating to the server folder and using the command:

```yarn server```

Upon success, the server may be accessed at:

    http://localhost:5050

# Diagram
[(Back to top)](#table-of-contents)

![Database Diagram](Database%20Diagram.png?raw=true "Database Diagram")

# Schema
[(Back to top)](#table-of-contents)

![Database Schema](./Database%20Schema.png?raw=true "Database Schema")
# Explanation
[(Back to top)](#table-of-contents)

The following parameters will be observed (please note that due to time constraints on my part, these are arbitrary and simply based off the rough population of the U.S.):

- A userbase of approx. 300m users will be assumed (approx. population of the U.S.)
- Approximately 100m concurrent users will be assumed (~1/3 of total userbase)
- Around 150m daily posts (we will assume all posts are text-only for simplicity's sake)

A basic Visio network/database diagram will be included along with the code files. The logic/data flow of the diagram is as follows:

The App will have Users/Clients that will connect to a Web Server. The Web Server will communicate with an Application Server, 
which will process the main application logic. After processing, the data will be stored in a relational Database (in this case, SQLite). A Relational Database
was chosen because the data the application will process is relational in nature - users can follow and be followed by other users, users can make posts, and
every post is linked to a user, and in a larger/more complex application, those posts could be liked, "retweeted" (or equivalent), etc, so our data is relational
in nature. In the event that large files must be stored (Webms or other video files, for example), a File Store could be used, but this is not mandatory and will
not be implemented in the code as this is meant to be a basic app for demonstration purposes only.

Please note that code for posting messages has been kept as simple as possible as per requester's instructions, and also due to time constraints. 
Thus, things such as input validation and error checking/handling will not be done for those endpoints. Basic validation has been done for authentication endpoints.

# Usage
[(Back to top)](#table-of-contents)

Since this project only includes a Back-end, there is no UI with which to test the functionality. Consequently, if you wish to test the functionality yourself,
you will have to use some kind of platform that allows you to send HTTP requests and receive responses. I am using Postman. Of course, in order to test this locally,
you must install the dependencies and run the server (see Installation section).

## Creating an Account (User)

To create a User, send a POST request to the /register endpoint. Upon successful creation, the new user that has been created will be returned as a response. 
The required payload and response are:

![Register Endpoint Test](./Register%20Endpoint%20Test.png "Register Endpoint Test")

## Logging in as a User

To log in as a user, send a POST request to the /login endpoint. Upon successful login, the requested user's login info will be returned as a response.
Payload and response on valid payload:

![Login Endpoint Test Success](./Login%20Endpoint%20Test%20Success.png "Login Endpoint Test Success")

If you provide invalid information (i.e. authentication fails), you will receive a basic "invalid input" message as a 
response (of course, a real app would do much, much more):

![Login Endpoint Test Failure](./Login%20Endpoint%20Test%20Failure.png "Login Endpoint Test Failure")

## Posting as a User

To create a post as a user, send a POST request to /posts/:userId. The ID of the user you are posting as must be provided. Please note that validation is
not done on the userId provided (as per request for only basic post functionality and time constraints). Payload and response on successful authentication:

![Post Endpoint Test](./Post%20Endpoint%20Test.png "Post Endpoint Test")

Payload and response on failed authentication:

![Post Endpoint Test Failure](./Post%20Endpoint%20Test%20Failure.png "Post Endpoint Test Failure")
### A Note on Authentication when Posting a message

JWT is used for authentication purposes during the Post process. In order to Post as a user, you must provide a JWT token. This token is created
when logging in as a User and would typically be stored in localStorage (or otherwise) by whatever Client-side platform is being used (React, Angular, ...).
The key could then be sent as part of the payload in the HTTP POST request made by the front-end. For obvious reasons, it wouldn't be ideal to store 
this token in the Database, so as a workaround, the JWT token will be logged to the console when you successfully log in as a user:

![JWT Token Login Endpoint](./JWT%20Token%20Login%20Endpoint.png "JWT Token Login Endpoint")

In order to successfully Post a message as a user, you must first Log In as that user, copy the JWT token, and add a x-access-token Header to the
POST request you send to /posts/:userId:

![X-Access-Token Post Endpoint](./X-Access-Token%20Header%20Post%20Endpoint.png "X-Access-Token Post Endpoint")

Doing this will result in a successful post. If no X-Access-Token header is provided, the Post will fail.

Once a token is created, it will be valid for 12 hours (this is just so you don't have to keep copy and pasting keys over and over again).

## Retrieving all Posts by a User

To retrieve all posts by a user, send a GET request to /posts/:userId. Payload and response:

![Post Retrieval Endpoint Test](./Post%20Retrieval%20Endpoint%20Test.png "Post Retrieval Endpoint Test")

## Retrieving all Posts

To retrieve ALL posts, send a GET request to /posts. No payload is required. This is mostly just a testing endpoint, as retrieving
all posts would become unwieldy in an app with millions of followers and posts. In any case, I've added some users and posts just to show off
the functionality:
# Q & A
[(Back to top)](#table-of-contents)

### Why did you use an auto-incremented INTEGER for ids? Isn't that a bit unsafe?

Typically I would use something like a UUID for ids, but SQLite doesn't support a BOOLEAN(16) type for ids, and storing UUIDs in a STRING
would complicate the implementation of the pivot tables, so I decided to keep it simple and just use auto-incremented integers.

### Why did you use the STRING type for Posts? Posts can contain images or videos too, can't they?

This is a similar question to the one above, and the answer is similar as well. I'd typically use something like a BLOB for a post,
but for simplicity's sake I decided to stick to just the bare basics of what constitutes a post (text). This should suffice for the 
purposes of this exercise.

### Why are you using sync() instead of migrations? Aren't migrations better and more reliable/efficient?

Yes, but they're also more time-consuming to set up, and unfortunately, I'm on a bit of a tight schedule.

### Why did you use .then() for the /users route but async/await for every other route?

Basically just to demonstrate that I can work with both promise chaining and async/await syntax. Since that route
is there just for testing, it's the ideal place to do it.

### Why did you include a .env file in the repo? Isn't that a security risk?

Again, this was done for demo purposes. I typically wouldn't do this (or use a simple string for the secret key, for that matter).