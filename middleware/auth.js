const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  //Take the token from the header
  const token = req.header("x-auth-token");

  //Check for token
  if (!token) {
    return res.status(401).json({ msg: "Authorization Denied" });
  }

  try {
    //If token, verify
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //Take the user from the token and put it into the request
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token not valid" });
  }
}

module.exports = auth;