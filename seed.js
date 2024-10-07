// seeds.js
const mongoose = require('mongoose');
const { User, Thought } = require('./models');
const db = require('./config/connection');

// Example seed data
const users = [
  { username: 'testuser3', email: 'testuser3@example.com' },
  { username: 'testuser4', email: 'testuser4@example.com' },
];

const thoughts = [
  { thoughtText: 'This is a test thought 3', username: 'testuser3' },
  { thoughtText: 'This is a test thought 4', username: 'testuser4' },
];

// Seed function to populate the database
db.once('open', async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Insert seed data
    await User.insertMany(users);
    await Thought.insertMany(thoughts);

    console.log('Database seeded successfully!');
    process.exit(0); // Exit the process when done
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit with failure
  }
});
