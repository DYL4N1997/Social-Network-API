
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
