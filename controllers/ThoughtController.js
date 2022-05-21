const { Thought, User } = require("../models");

module.exports = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err.message);
      });
  },

  getThoughtByID({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this ID" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err.message);
      });
  },

  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  addReaction ({ params, body}, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
    )
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought with this ID!' });
            return;
        }
        res.json(dbThoughtData)
    })
    .catch(err => res.json(err.message));   
  },

   removeReaction({ params }, res) {
     Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
    )
    .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "No thoughts with the ID selected!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err.message));
  },


  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.id }, 
        body,
        { new: true, runValidators: true }
    )
    .then(updatedThought => {
        if (!updatedThought) {
            return res.status(404).json({ message: 'No thought with this ID!' });
        }
        res.json(updatedThought);
        })
        .catch(err => res.json(err.message));
   },

   deleteThought({ params, body}, res) {
    Thought.findOneAndDelete({ _id: params.id })
    .then(deletedThought => {
        if (!deletedThought) {
            return res.status(404).json({ message: 'No thought with this ID!'})
        }
        res.json(deletedThought);
        })
        .catch(err => res.json(err.message));
    }
};

