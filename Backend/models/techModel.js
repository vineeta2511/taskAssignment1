
const mongoose = require('mongoose');
mongoose.set("debug", true);
mongoose.set('autoCreate', false)
mongoose.set('autoIndex',false);

// const resourceSchema = mongoose.Schema({
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
  image: {
    type: String,
    required: true
  },
  // resources: {
  //   type:[resourceSchema]
  // },

  resources: [String],
  status: {
    type: String,
    required: true,
    enum: ['Active', 'Inactive'],
default :'Inactive'
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Technology', technologySchema);
