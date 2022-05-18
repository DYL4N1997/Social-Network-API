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

    //Get User by ID including their thoughts
    getUserById({ params }, res) {
     User.findOne({ _id: params.id })
        .populate("thoughts")
        .populate ("friends")
        .select("-__v")
        .then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "No user can be found with the provided id"})
            return;   
         }   
          res.json(dbUserData);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        });
    },

      //create User
      createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err.message));
    },

    //add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            {_id: params.id},
            { $addToSet: { friends: params.friendId } },
            { new: true, runValidators: true}
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this ID!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },