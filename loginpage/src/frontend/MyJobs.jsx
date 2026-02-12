import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "http://localhost:4000";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

  const fetchJobs = () => {
    fetch(`${API_BASE}/api/jobs/my`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setJobs(data.jobs);
      })
      .catch(err => console.error(err));
  };

  useEffect(fetchJobs, []);

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    const res = await fetch(
      `${API_BASE}/api/jobs/delete/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = await res.json();
    alert(data.message);
    fetchJobs();
  };

  if (!jobs.length)
    return <p style={{ padding: 20 }}>No jobs posted yet.</p>;

  return (
    <div style={styles.page}>
      <h1>My Posted Jobs</h1>

      <div style={styles.grid}>
        {jobs.map(job => (
          <div key={job._id} style={styles.card}>
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>
            <p>{job.jobType}</p>

            <div style={styles.buttons}>
              <button
                style={styles.viewBtn}
                onClick={() => navigate(`/jobs/${job._id}`)}
              >
                View
              </button>

              <button
                style={styles.applicantsBtn}
                onClick={() =>
                  navigate(`/jobs/${job._id}/applicants`)
                }
              >
                Applicants
              </button>

              <button
                style={styles.deleteBtn}
                onClick={() => deleteJob(job._id)}
              >
                Delete
              </button>
            </div>
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
  buttons: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  viewBtn: {
    padding: "8px",
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  applicantsBtn: {
    padding: "8px",
    background: "#0a7cff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  deleteBtn: {
    padding: "8px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default MyJobs;
