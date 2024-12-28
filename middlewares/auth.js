const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  //gets authorization from the headers
  const { authorization } = req.headers;

  //if there is NO authorization or DOESN'T start with "Bearer"
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authorization Required!");
  }

  //if authorized, gets token
  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    //try to verify token
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    //if can't verify, return errors
    return next(new UnauthorizedError("Authorization Required!"));
  }

  //if success, assign payload to request object
  req.user = payload;

  //sending request to the next middleware
  return next();
};

module.exports = auth;
