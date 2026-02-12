import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:4000";

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/jobs/applied`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setJobs(data.jobs);
      })
      .catch(err => console.error(err));
  }, []);

  if (!jobs.length)
    return <p style={{ padding: 20 }}>No applied jobs yet.</p>;

  return (
    <div style={styles.page}>
      <h1>Your Applied Jobs</h1>

      <div style={styles.grid}>
        {jobs.map(job => (
          <div key={job._id} style={styles.card}>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.jobType}</p>

            {job.salary && <p>Salary: {job.salary}</p>}

            <button
              style={styles.btn}
              onClick={() => navigate(`/jobs/${job._id}`)}
            >
              View Details
            </button>
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
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  },
  btn: {
    marginTop: "10px",
    padding: "10px",
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default AppliedJobs;
