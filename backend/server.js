const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data (acts like DB)
let tasks = [
  { id: 1, title: "Sample Task 1", status: "OPEN", date: "2026-04-28" },
  { id: 2, title: "Sample Task 2", status: "CLOSED", date: "2026-04-27" }
];

app.get("/", (req, res) => {
  res.send("API is running successfully 🚀");
});

// -----------------------------
// GET all tasks
// -----------------------------
app.get("/tasks", (req, res) => {
  res.status(200).json([
    { id: 1, title: "Sample Task 1", status: "OPEN", date: "2026-04-28" },
    { id: 2, title: "Sample Task 2", status: "CLOSED", date: "2026-04-27" }
  ]);
});

// -----------------------------
// CREATE task
// -----------------------------
app.post("/tasks", (req, res) => {
  const { title, status, date } = req.body;

  if (!title || !status) {
    return res.status(400).json({ message: "Title and status required" });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    status,
    date
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// -----------------------------
// UPDATE task
// -----------------------------
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  Object.assign(task, req.body);

  res.status(200).json(task);
});

// -----------------------------
// DELETE task
// -----------------------------
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = tasks.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(index, 1);

  res.status(200).json({ message: "Task deleted successfully" });
});

// -----------------------------
// STATS endpoint (for dashboard)
// -----------------------------
app.get("/stats", (req, res) => {
  const open = tasks.filter(t => t.status === "OPEN").length;
  const closed = tasks.filter(t => t.status === "CLOSED").length;

  res.status(200).json({ open, closed });
});

// -----------------------------
// AI endpoint
// -----------------------------
app.get("/ai", (req, res) => {
  res.status(200).json({
    message: "Focus on completing high priority OPEN tasks first."
  });
});

// -----------------------------
// EXPORT for testing (IMPORTANT)
// -----------------------------
module.exports = app;

// -----------------------------
// START SERVER
// -----------------------------
if (require.main === module) {
  app.listen(PORT, () => {
    console.log("Server running on port", PORT);
  });
}