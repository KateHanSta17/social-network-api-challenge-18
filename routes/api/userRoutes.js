// routes/api/userRoutes.js
const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/')
  .get(getAllUsers)    // Get all users
  .post(createUser);    // Create a user

// /api/users/:userId
router.route('/:userId')
  .get(getUserById)     // Get a user by ID
  .put(updateUser)      // Update a user by ID
  .delete(deleteUser);  // Delete a user by ID

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
  .post(addFriend)      // Add a friend to user's friend list
  .delete(removeFriend); // Remove a friend from user's friend list

module.exports = router;
