# Basic Social Media App Backend Challenge

This is a programming challenge that involves designing a basic back-end for a social media app such as Twitter, Facebook, etc.

As per the assignment specifications, 2 basic services will be included: authentication and messages (posts and retrievals). The ability of users to follow and be followed
by other users will be taken into consideration.

The following parameters will be observed (please note that due to time constraints on my part, these are arbitrary and simply based off the rough population of the U.S.):

- A userbase of approx. 300m users will be assumed (approx. population of the U.S.)
- Approximately 100m concurrent users will be assumed (~1/3 of total userbase)
- Around 150m daily posts (which may be text, images, videos, URLs, ...)


# Table of contents
- [Table of contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)

# Installation
[(Back to top)](#table-of-contents)

Navigate to the directory in which you want to install the project, then run the following command:

```git clone https://github.com/kidgray/.git```

To install the project dependencies, navigate to the root directory of the cloned project and use
the following command:

```yarn install```

NOTE: This project uses the following ports:

    Server: Port 3000

Please make sure these ports are available for use prior to executing it.

On the terminal, navigate to the client folder and start the client by using the command:

```yarn client```

Upon success, the client may be accessed at:

    http://localhost:8080

You may start the server by navigating to the server folder and using the command:

```yarn server```

Upon success, the server may be accessed at:

    http://localhost:5050

# Usage
[(Back to top)](#table-of-contents)

### Adding a Bug

To add a Bug, enter a Priority value and a description into the "Add New Bug" form and click the "Add Bug" button.

### Editing a Bug

To edit a bug, simply click on the bug's ID in the bug list.