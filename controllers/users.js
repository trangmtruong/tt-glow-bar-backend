const User = require("../models/user");

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
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Missing email or password");
  }

  //creates jwt if email and password are valid
};

module.exports = { getUsers, createUser, getUserId };
