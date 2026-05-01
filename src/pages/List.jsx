import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function List() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const { logout } = useAuth();
  const navigate = useNavigate();

  // Fetch data from backend
  const fetchData = async (pageNumber) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/all?page=${pageNumber}&limit=5`
      );
      setData(res.data.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  // Logout function
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>List Page</h2>

      {/* Logout Button */}
      <button onClick={handleLogout}>Logout</button>

      <br /><br />

      {/* Data List */}
      {data.length === 0 ? (
        <p>No data found</p>
      ) : (
        data.map((item, index) => (
          <p key={index}>{item.name}</p>
        ))
      )}

      <br />

      {/* Pagination */}
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Prev
      </button>

      <span style={{ margin: "0 10px" }}>Page {page}</span>

      <button onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  );
}