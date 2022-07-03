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
- Around 150m daily posts (which may be text, images, videos, URLs, ...)

A basic Visio network/database diagram will be included along with the code files. The logic/data flow of the diagram is as follows:

The App will have Users/Clients that will connect to a Web Server. The Web Server will communicate with an Application Server, 
which will process the main application logic. After processing, the data will be stored in a relational Database (in this case, SQLite). A Relational Database
was chosen because the data the application will process is relational in nature - users can follow and be followed by other users, users can make posts, and
every post is linked to a user, and in a larger/more complex application, those posts could be liked, "retweeted" (or equivalent), etc, so our data is relational
in nature. In the event that large files must be stored (Webms or other video files, for example), a File Store could be used, but this is not mandatory and will
not be implemented in the code as this is meant to be a basic app for demonstration purposes only.

It should be noted that the posts, followers, and followed users in the users table will be stored as comma-separated strings. This is sub-optimal from a performance
standpoint, as a more optimal solution would be to use lookup/pivot tables that link, for example, users and followers in this way:

users_followers table

id_user | id_follower
---------------------
1       |       2
2       |       3
4       |       1
...     |       ...

However, as this project is only meant to be a demo, I will be using the comma-separated string method (again, due to time constraints).