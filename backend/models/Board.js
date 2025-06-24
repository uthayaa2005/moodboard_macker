const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  createdBy: { type: String, required: true }, // <-- add this line
}, {
  timestamps: true,
});

module.exports = mongoose.model('Board', boardSchema);
