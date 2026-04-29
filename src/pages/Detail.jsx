import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/item/${id}`)
      .then(res => setItem(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/item/${id}`);
    navigate("/");
  };

  const getColor = (score) => {
    if (score > 70) return "red";
    if (score > 40) return "orange";
    return "green";
  };

  const btnEdit = {
    padding: "10px",
    marginRight: "10px",
    background: "blue",
    color: "white",
    border: "none",
    borderRadius: "5px"
  };

  const btnDelete = {
    padding: "10px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "5px"
  };

  if (!item) return <p>Loading...</p>;

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>Detail Page</h2>

      <h3>{item.name}</h3>

      {/* SCORE BADGE */}
      <span style={{
        background: getColor(item.score),
        color: "white",
        padding: "8px 15px",
        borderRadius: "20px",
        fontWeight: "bold"
      }}>
        Score: {item.score}
      </span>

      <br /><br />

      {/* BUTTONS */}
      <button style={btnEdit} onClick={() => navigate(`/edit/${id}`)}>
        Edit
      </button>

      <button style={btnDelete} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}