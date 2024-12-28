const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  //gets authorization from the headers
  const { authorization } = req.headers;

  //if there is NO authorization or DOESN'T start with "Bearer"
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authorization Required!");
  }

  //gets token
  const token = authorization.replace("Bearer ", "");
  let payload;
};

module.exports = auth;
