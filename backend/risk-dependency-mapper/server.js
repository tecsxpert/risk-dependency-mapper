const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// ✅ Dummy Data (acts like DB)
let data = [
  { id: 1, name: "Item 1", score: 20 },
  { id: 2, name: "Item 2", score: 50 },
  { id: 3, name: "Item 3", score: 80 },
  { id: 4, name: "Item 4", score: 65 }
];

// ✅ GET ALL ITEMS
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ GET SINGLE ITEM (for Detail page)
app.get("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const item = data.find(i => i.id === id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.json(item);
});

// ✅ DELETE ITEM
app.delete("/items/:id", (req, res) => {
  const id = parseInt(req.params.id);
  data = data.filter(i => i.id !== id);

  res.json({ message: "Item deleted successfully" });
});

// ✅ STATS API (for Dashboard)
app.get("/stats", (req, res) => {
  const stats = {
    total: data.length,
    low: data.filter(i => i.score <= 40).length,
    medium: data.filter(i => i.score > 40 && i.score <= 70).length,
    high: data.filter(i => i.score > 70).length,
  };

  res.json(stats);
});

// ✅ START SERVER
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});