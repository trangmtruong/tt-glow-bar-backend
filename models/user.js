const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  avatar: {
    type: String,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    requires: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    select: false,
  },
});

//add findUserByCredentials
//finding email and password using findUserByCredentials
userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  //find this email
  return (
    this.findOne({ email })
      //and password
      .select("+password")
      //if found user, ==>
      .then((user) => {
        //if NO user is found,
        if (!user) {
          //logs "User not found"

          console.log("User not found");
          //and returns error message
          return Promise.reject(new Error("Incorrect email or password"));
        }
        // ==> logs user to the console
        console.log(user);
        // ====> and return hashed password
        return bcrypt.compare(password, user.password).then((matched) => {
          //if password is NOT matched
          if (!matched) {
            //logs to console
            console.log("Password doesn't match");
            //and return Error message
            return Promise.reject(new Error("Incorrect email or password"));
          }
          //=====> returns user
          return user;
        });
      })
  );
};

module.exports = mongoose.model("user", userSchema);
