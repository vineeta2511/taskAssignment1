
const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
});


const technologySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  resources: {
    type:[resourceSchema],
    require:true,
  },
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Inactive'],

  },
  image: {
    type: String,
    required: true,
  },
});

const Technology = mongoose.model('Technology', technologySchema);

module.exports = Technology;
