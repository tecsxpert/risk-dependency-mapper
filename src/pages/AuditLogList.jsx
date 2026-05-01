import React, { useEffect, useState } from "react";
import { getAuditLogs } from "../api/auditApi";

export default function AuditLogList() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await getAuditLogs();
      setLogs(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Audit Logs</h2>

      {loading && <p>Loading...</p>}

      {!loading && logs.length === 0 && <p>No records found</p>}

      {!loading && logs.length > 0 && (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Action</th>
              <th>User</th>
              <th>Timestamp</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.action}</td>
                <td>{item.user}</td>
                <td>{item.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}