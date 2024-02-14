const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const PORT = 8000;

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Allow frontend to connect to backend
app.use(cors({ origin: FRONTEND_URL }));
app.use(bodyParser.json());

let tasks = [];

// Get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post("/tasks", (req, res) => {
  const { title } = req.body;
  const newTask = { id: tasks.length + 1, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Mark a task as completed
app.put("/tasks/:id/complete", (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(id));
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = true;
    res.status(200).json(tasks[taskIndex]);
  } else {
    res.status(404).send("Task not found");
  }
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id !== parseInt(id));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
