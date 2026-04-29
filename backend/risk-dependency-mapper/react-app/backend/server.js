const express = require("express");
const app = express();
const PORT = 5000;

// middleware
app.use(express.json());

// test route
app.get("/", (req, res) => {
    res.send("Server is working");
});

// POST /recommend
app.post("/recommend", (req, res) => {
    const { risk_type, severity } = req.body;

    let recommendations = [];

    if (severity === "high") {
        recommendations = [
            {
                action_type: "MITIGATION",
                description: "Immediately reduce risk exposure",
                priority: "HIGH"
            },
            {
                action_type: "ESCALATION",
                description: "Notify senior management",
                priority: "HIGH"
            },
            {
                action_type: "MONITORING",
                description: "Track risk daily",
                priority: "MEDIUM"
            }
        ];
    } else {
        recommendations = [
            {
                action_type: "MONITORING",
                description: "Monitor risk weekly",
                priority: "LOW"
            },
            {
                action_type: "DOCUMENTATION",
                description: "Record risk details",
                priority: "LOW"
            },
            {
                action_type: "REVIEW",
                description: "Review in next meeting",
                priority: "MEDIUM"
            }
        ];
    }

    res.json(recommendations);
});

// start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});