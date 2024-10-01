// controllers/userController.js
const { User } = require('../models');

module.exports = {
  // Get all users
  getAllUsers(req, res) {
    User.find({})
      .select('-__v')  // Exclude __v field from results
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Get a user by ID
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts friends')
      .then((user) =>
        !user ? res.status(404).json({ message: 'No user found with this id!' }) : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Update a user by ID
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true, runValidators: true })
      .then((user) =>
        !user ? res.status(404).json({ message: 'No user found with this id!' }) : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user by ID
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user ? res.status(404).json({ message: 'No user found with this id!' }) : res.json({ message: 'User and associated thoughts deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add a friend to user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },  // Add friend if not already added
      { new: true }
    )
      .then((user) =>
        !user ? res.status(404).json({ message: 'No user found with this id!' }) : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove a friend from user's friend list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },  // Remove friend from the list
      { new: true }
    )
      .then((user) =>
        !user ? res.status(404).json({ message: 'No user found with this id!' }) : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
