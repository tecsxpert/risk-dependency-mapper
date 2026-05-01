import { useEffect, useState } from "react";
import axios from "axios";

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/tasks")
      .then(res => {
        const tasks = res.data;

        const open = tasks.filter(t => t.status === "OPEN").length;
        const closed = tasks.filter(t => t.status === "CLOSED").length;

        setData({ open, closed });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Analytics</h2>

      {!data ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>OPEN: {data.open}</p>
          <p>CLOSED: {data.closed}</p>
        </div>
      )}
    </div>
  );
}