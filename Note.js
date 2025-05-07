const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
  title: {
    type: String,
    unique: true
  },
  content: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);
