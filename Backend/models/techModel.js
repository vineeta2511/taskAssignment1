// Import required modules
const mongoose = require('mongoose');

// Define the Technology schema
const technologySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  resources: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Technology = mongoose.model('Technology', technologySchema);

module.exports = Technology;
