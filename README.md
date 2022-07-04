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

Please note that all code has been kept as simple as possible as per requester's instructions, and also due to time constraints. Thus, things such as input validation
and error checking/handling will not be done.

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

