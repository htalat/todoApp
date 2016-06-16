var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var todoSchema = new Schema({
  text: { type: String, required: true },
  done: { type: Boolean, required: true }
});

module.exports = mongoose.model('ToDo',todoSchema);
