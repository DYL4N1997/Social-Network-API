const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  addFriend,
  deleteFriend,
  updateUser,
  deleteUser
} = require("../../controllers/UserController");

//   Path = /api/users
router
    .route("/")
    .get(getAllUsers)
    .post(createUser);

//  Path =  /api/users/:id
router
    .route("/:id")
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// Path = /api/users/:userId/friends/:friendId
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;