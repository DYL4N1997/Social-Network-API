const { Thought, User } = require("../models");

module.exports = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((ThoughtData) => res.json(ThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err.message);
      });
  },

  getThoughtByID({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .then((ThoughtData) => {
        if (!ThoughtData) {
          res.status(404).json({ message: "No thought found with this ID" });
          return;
        }
        res.json(ThoughtData);
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
      .then((UserData) => {
        if (!UserData) {
          res.status(404).json({ message: "No user found with this id!" });
          return;
        }
        res.json(UserData);
      })
      .catch((err) => res.json(err.message));
  },

  addReaction ({ params, body}, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
    )
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v")
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
        { _id: params.thoughtId }, 
        body,
        { new: true, runValidators: true }
    )
    .then(ThoughtData => {
        if (!ThoughtData) {
            return res.status(404).json({ message: 'No thought with this ID!' });
        }
        res.json(ThoughtData);
        })
        .catch(err => res.json(err.message));
   },

   deleteThought({ params, body}, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
    .then(deletedThought => {
        if (!deletedThought) {
            return res.status(404).json({ message: 'No thought with this ID!'})
        }
        res.json(deletedThought);
        })
        .catch(err => res.json(err.message));
    }
};

