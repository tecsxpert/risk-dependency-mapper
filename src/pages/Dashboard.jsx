import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ open: 0, closed: 0 });

  const [aiResponse, setAiResponse] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/stats");
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);

  // AI button
  const handleAI = async () => {
    setLoadingAI(true);
    setAiResponse("");

    try {
      const res = await axios.get("http://localhost:5000/ai");

      setTimeout(() => {
        setAiResponse(res.data.message);
        setLoadingAI(false);
      }, 1000);
    } catch (err) {
      setAiResponse("Error fetching AI response");
      setLoadingAI(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Task Dashboard</h2>

      {/* Stats */}
      <div>
        <h3>Stats</h3>
        <p>OPEN: {stats.open}</p>
        <p>CLOSED: {stats.closed}</p>
      </div>

      {/* Task List */}
      <div style={{ marginTop: "20px" }}>
        <h3>Task List</h3>

        {tasks.map(task => (
          <div key={task.id} style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px"
          }}>
            <p><b>{task.title}</b></p>
            <p>Status: {task.status}</p>
            <p>Date: {task.date}</p>
          </div>
        ))}
      </div>

      {/* AI Panel */}
      <div style={{ marginTop: "30px" }}>
        <h3>AI Suggestions</h3>

        <button onClick={handleAI}>Ask AI</button>

        {loadingAI && <p>Loading AI response...</p>}

        {aiResponse && (
          <div style={{
            border: "1px solid black",
            padding: "10px",
            marginTop: "10px",
            borderRadius: "8px"
          }}>
            <h4>AI Suggestion</h4>
            <p>{aiResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
}