const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: String,
  dueDate: Date,
  user: String,
  remindersSent: Boolean,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
