const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const { handleErrors } = require("../utils/errors");
const BadRequestError = require("../errors/bad-request-err");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.name });
    });
};

const createUser = (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  User.create({ name, email, password })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      console.log(err.name);
      if (err.name === "ValidationError") {
        return res.status(409).send({ message: err.name });
      }
      return res.status(500).send({ message: err.name });
    });
};

const getUserId = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: err.name });
      } else if (err.name === "CastError") {
        return res.status(400).send({ message: err.name });
      }
      return res.status(500).send({ message: err.name });
    });
};

const signIn = (req, res) => {
  //get email and password from req.body
  const { email, password } = req.body;
  //if email and password are INCORRECT, throw error
  if (!email || !password) {
    throw new Error("Missing email or password");
  }

  //if email and password are CORRECT, find user
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new BadRequestError("User's email and password are incorrect");
      }

      //creates jwt if email and password are valid
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      //sends token
      res.send({ token });
    })
    .catch((err) => {
      handleErrors(err, next);
    });
};

module.exports = { getUsers, createUser, getUserId, signIn };
