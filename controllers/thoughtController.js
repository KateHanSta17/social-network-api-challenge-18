// controllers/thoughtController.js
const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .select('-__v')
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Get a thought by ID
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought ? res.status(404).json({ message: 'No thought found with this id!' }) : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a new thought (also push the thought _id to the associated user's thoughts array)
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user ? res.status(404).json({ message: 'Thought created but no user found with this id!' }) : res.json('Thought created!')
      )
      .catch((err) => res.status(500).json(err));
  },

  // Update a thought by ID
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true, runValidators: true })
      .then((thought) =>
        !thought ? res.status(404).json({ message: 'No thought found with this id!' }) : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a thought by ID
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought ? res.status(404).json({ message: 'No thought found with this id!' }) : res.json({ message: 'Thought deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add a reaction to a thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((thought) =>
        !thought ? res.status(404).json({ message: 'No thought found with this id!' }) : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove a reaction from a thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) =>
        !thought ? res.status(404).json({ message: 'No thought found with this id!' }) : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
