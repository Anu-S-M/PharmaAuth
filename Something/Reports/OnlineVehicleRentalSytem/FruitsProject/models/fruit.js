const mongoose = require('mongoose');

// Define a fruit schema
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: String,
  // Add other properties as needed
});

// Create a fruit model
const Fruit = mongoose.model('Fruit', fruitSchema);

module.exports = Fruit;
