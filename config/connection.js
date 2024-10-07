// config/connection.js
import { connect, connection } from 'mongoose';

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialnetworkDB';

connect(mongoURI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with a failure code
  });

export default connection;