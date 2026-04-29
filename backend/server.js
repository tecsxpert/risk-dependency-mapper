const express = require("express");
const app = express();
const PORT = 5000;
const cors = require("cors");
// middleware
app.use(cors());
app.use(express.json());

// ✅ Root route (for testing)
app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// ✅ Dashboard stats API
app.get("/stats", (req, res) => {
  res.json({
    total: 4,
    highRisk: 1,
    mediumRisk: 2,
    lowRisk: 1
  });
});

// ✅ STEP 1 — Get single item (Detail page)
app.get("/item/:id", (req, res) => {
  const data = {
    id: req.params.id,
    name: "Sample Risk Item",
    score: 72
  };

  res.json(data);
});

// ✅ STEP 3 — Delete item
app.delete("/item/:id", (req, res) => {
  res.json({
    message: `Item with ID ${req.params.id} deleted successfully`
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
