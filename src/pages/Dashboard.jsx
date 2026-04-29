import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/stats")
      .then(res => setStats(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!stats) return <p>Loading...</p>;

  const data = [
    { name: "High", value: stats.highRisk },
    { name: "Medium", value: stats.mediumRisk },
    { name: "Low", value: stats.lowRisk }
  ];

  const cardStyle = {
    padding: "20px",
    borderRadius: "10px",
    background: "#f5f5f5",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    width: "150px",
    textAlign: "center"
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2 style={{ marginBottom: "20px" }}>📊 Risk Dashboard</h2>

      {/* KPI CARDS */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={cardStyle}>
          <h4>Total</h4>
          <p>{stats.total}</p>
        </div>

        <div style={{ ...cardStyle, borderLeft: "5px solid red" }}>
          <h4>High Risk</h4>
          <p>{stats.highRisk}</p>
        </div>

        <div style={{ ...cardStyle, borderLeft: "5px solid orange" }}>
          <h4>Medium Risk</h4>
          <p>{stats.mediumRisk}</p>
        </div>

        <div style={{ ...cardStyle, borderLeft: "5px solid green" }}>
          <h4>Low Risk</h4>
          <p>{stats.lowRisk}</p>
        </div>
      </div>

      {/* CHART */}
      <div style={{ width: "600px", height: "300px" }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}