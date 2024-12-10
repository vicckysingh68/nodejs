const mongoose = require('mongoose');

// Define the MongoDB Connection URL
const mongoURL = 'mongodb://localhost:27017/hotels';

// Set up MongoDB connection (no need for useNewUrlParser and useUnifiedTopology anymore)
mongoose.connect(mongoURL)
  .then(() => {
    console.log('Connected to MongoDB server');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Get the default connection object
const db = mongoose.connection;

// Define event listeners for the database connection
 

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Optionally, you can handle process termination (e.g., when pressing Ctrl+C) to close the MongoDB connection gracefully
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed due to application termination');
  process.exit(0);
});

module.exports = db;
