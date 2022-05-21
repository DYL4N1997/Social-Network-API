const { User, Thought } = require("../models");

// create user controller variable

module.exports = {
  // get all the users
  getAllUsers(req, res) {
    User.find({})
      .then((UserData) => res.json(UserData))
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
        .then((UserData) => {
          if (!UserData) {
            res.status(404).json({ message: "No user can be found with the provided id"})
            return;   
         }   
          res.json(UserData);
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
        .then(UserData => {
            if (!UserData) {
                res.status(404).json({ message: 'No user found with this ID!' });
                return;
            }
            res.json(UserData);
        })
        .catch(err => res.json(err));
    },

    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
          { _id: params.id },
          { $pull: { friends: params.friendId } },
          { runValidators: true }
        )
          .then((UserData) => {
            if (!UserData) {
              res.status(404).json({ message: "No user found with this id!" });
              return;
            }
            res.json(UserData);
          })
          .catch((err) => res.status(400).json(err.message));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true})
        .then(UserData => {
            if (!UserData) {
                res.status(404).json({ message: 'No user found with this ID!' });
                return;
            }
            res.json(UserData);
        })
           .catch(err => res.json(err.message))
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(UserData => {
        if (!UserData) {
            res.status(404).json({ message: 'No user found with this ID!' });
            return;
        }
        res.json(UserData);
        })
        .catch(err => res.status(400).json(err.message))
    },
};
