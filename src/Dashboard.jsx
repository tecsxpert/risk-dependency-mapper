import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/tasks")
      .then(res => {
        console.log(res.data); // 👈 DEBUG
        setTasks(res.data);
      })
      .catch(err => {
        console.error("Error fetching tasks:", err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📋 Task Dashboard</h2>

      {tasks.length === 0 ? (
        <p>Loading tasks...</p>
      ) : (
        tasks.map(task => (
          <div key={task.id} style={{
            border: "1px solid #ccc",
            margin: "10px",
            padding: "10px"
          }}>
            <h4>{task.title}</h4>
            <p>Status: {task.status}</p>
            <p>Date: {task.date}</p>
          </div>
        ))
      )}
    </div>
  );
}