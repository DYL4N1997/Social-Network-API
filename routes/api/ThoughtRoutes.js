
const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtByID,
  createThought,
  addReaction,
  removeReaction,
  updateThought,
  deleteThought
} = require("../../controllers/ThoughtController");

const { route } = require("./userRoutes");

// /api/thoughts
router.route("/").get(getAllThoughts);

// /api/thoughts/userId
router.route("/:userId").post(createThought);

// /api/thoughts/thoughtId
router
  .route("/:thoughtId")
  .get(getThoughtByID)
  .put(updateThought)
  .delete(deleteThought);

///api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);