const mongoose = require('mongoose');
const Fruit = require('./models/fruit'); // Import your Mongoose model

// Replace the following connection URL with your MongoDB instance's URL.
const url = 'mongodb://0.0.0.0:27017/fruitsdb';

// Default MongoDB port is 27017
const dbName = 'fruitsdb'; // Specify your database name

// Connect to MongoDB using Mongoose
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Create a connection to the database
const db = mongoose.connection;

// Check for MongoDB connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async function () {
    console.log('Connected successfully to MongoDB');

    // Create a new fruit document
    const apple = new Fruit({
        name: 'Apple',
        rating: 9,
        review: 'Delicious and crunchy!',
    });

    // Save the fruit document to the "fruits" collection
    try {
        const savedApple = await apple.save();
        console.log('Saved a new fruit:', savedApple);

        // Close the connection when done (if needed)
        mongoose.connection.close();
    } catch (error) {
        console.error('Error saving fruit:', error);
    }
});

  