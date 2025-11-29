const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const Task = require('../models/Task'); // model for public listing
const requireLogin = require('../middleware/requireLogin'); // added import

console.log("tasks.js router loaded");

// Show all tasks (private, requires login)
router.get('/', requireLogin, taskController.getTasks);

// Create a new task (protected)
router.post('/create', requireLogin, taskController.createTask);

// Toggle task completion
router.post('/:id/toggle', requireLogin, taskController.toggleTask);

// Delete a task
router.post('/:id/delete', requireLogin, taskController.deleteTask);

// Public page: show all tasks without login
router.get('/public', async (req, res) => {
  console.log("/tasks/public route hit");
  try {
    const tasks = await Task.find();
    console.log("Tasks fetched:", tasks);
    res.render('tasks-public', { tasks });
  } catch (err) {
    console.error("Error in /tasks/public:", err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
