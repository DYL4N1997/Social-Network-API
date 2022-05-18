const { User, Thought } = require("../models");

// create user controller variable

module.exports = {
  // get all the users
  getAllUsers(req, res) {
    User.find({})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
    },