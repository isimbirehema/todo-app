const Task = require('../models/Task');

// Show tasks page with form + list
exports.getTasks = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

    res.render('tasks', {
      tasks,
      user: req.session.user
    });
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).send('Server Error');
  }
};

// Create: Add new task
exports.createTask = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const task = new Task({
      title: req.body.title,
      user: userId
    });
    await task.save();
    res.redirect('/tasks');
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).send('Server Error');
  }
};

// Update: Toggle completion
exports.toggleTask = async (req, res) => {
  try {
    const userId = req.session.user.id;
    const task = await Task.findOne({ _id: req.params.id, user: userId });
    if (!task) return res.status(404).send('Task not found');

    task.completed = !task.completed;
    await task.save();
    res.redirect('/tasks');
  } catch (err) {
    console.error('Error toggling task:', err);
    res.status(500).send('Server Error');
  }
};

// Delete: Remove task
exports.deleteTask = async (req, res) => {
  try {
    const userId = req.session.user.id;
    await Task.findOneAndDelete({ _id: req.params.id, user: userId });
    res.redirect('/tasks');
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).send('Server Error');
  }
};
