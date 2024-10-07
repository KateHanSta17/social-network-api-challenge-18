// server.js
const express = require('express');
const db = require('./config/connection'); // MongoDB connection file
const routes = require('./routes');  // Main route file

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the API routes from routes/index.js
app.use(routes);

// When the database connection is open, start the server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
