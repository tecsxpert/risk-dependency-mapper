const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

/* ----------------------------------
   📦 DEMO DATA (15 RECORDS)
---------------------------------- */
let tasks = [];

/* ----------------------------------
   🔥 DATA SEEDER
---------------------------------- */
function seedData() {
  if (tasks.length > 0) return;

  const statuses = ["OPEN", "CLOSED"];
  const titles = [
    "Fix login bug",
    "Update dashboard UI",
    "API integration",
    "Write unit tests",
    "Deploy app",
    "Optimize DB queries",
    "Add authentication",
    "Improve performance",
    "Fix CSS issues",
    "Code refactor",
    "Add logging",
    "Setup CI/CD",
    "Payment module bug",
    "Improve UX",
    "Security patch"
  ];

  for (let i = 0; i < 15; i++) {
    tasks.push({
      id: i + 1,
      title: titles[i],
      status: statuses[Math.floor(Math.random() * 2)],
      date: new Date(2026, 3, Math.floor(Math.random() * 28) + 1)
        .toISOString()
        .split("T")[0]
    });
  }

  console.log("✅ 15 demo tasks seeded");
}

/* ----------------------------------
   🌐 ROUTES
---------------------------------- */

// Root test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// ✅ IMPORTANT: TASKS API
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Stats API
app.get("/stats", (req, res) => {
  const open = tasks.filter(t => t.status === "OPEN").length;
  const closed = tasks.filter(t => t.status === "CLOSED").length;

  res.json({ open, closed });
});

/* ----------------------------------
   🚀 START SERVER
---------------------------------- */
app.listen(PORT, () => {
  seedData();
  console.log(`Server running at http://localhost:${PORT}`);
});