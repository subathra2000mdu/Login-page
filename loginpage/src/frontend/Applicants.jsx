import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE = "http://localhost:4000";

const Applicants = () => {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/jobs/${id}/applicants`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setApplicants(data.applicants);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!applicants.length)
    return <p style={{ padding: 20 }}>No applicants yet.</p>;

  return (
    <div style={styles.page}>
      <h1>Applicants List</h1>

      <div style={styles.grid}>
        {applicants.map(user => (
          <div key={user._id} style={styles.card}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>

            {user.resumeUrl && (
              <a
                href={`http://localhost:4000${user.resumeUrl}`}
                target="_blank"
                rel="noreferrer"
                style={styles.resumeBtn}
              >
                View Resume
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  page: {
    padding: "40px",
    background: "#f5f6f8",
    minHeight: "100vh",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },
  resumeBtn: {
    display: "inline-block",
    marginTop: "10px",
    padding: "8px 12px",
    background: "#0a7cff",
    color: "white",
    borderRadius: "6px",
    textDecoration: "none",
  },
};

export default Applicants;
