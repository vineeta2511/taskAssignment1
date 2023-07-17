
const mongoose = require('mongoose');

// const resourceSchema = new mongoose.Schema({
//   link: {
//     type: String,
//     required: true,
//   },
// });


const technologySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // resources:[{
  //   resource:{
  //     type: String,
  //     required: true,
  //   },
  // }],

  resources: [String],
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Inactive'],

  }
});

const Technology = mongoose.model('Technology', technologySchema);

module.exports = Technology;
