const jwt = require('jsonwebtoken');
const config = process.env;

const auth = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("Token required for authentication!");
  }
  try {
    const data = jwt.verify(token, config.JWT_SECRET_KEY);
    req.user = data;
  } 
  catch (err) {
    return res.status(401).send("Invalid token. Authentication failed.");
  }

  return next();
};

module.exports = auth;