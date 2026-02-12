import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE = "http://localhost:4000";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/jobs/${id}`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setJob(data.job);
      })
      .catch(err => console.error(err));
  }, [id]);

  const applyJob = async () => {
    const res = await fetch(
      `${API_BASE}/api/jobs/apply/${id}`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await res.json();
    alert(data.message);    
  };
  

  if (!job) return <p>Loading job details...</p>;

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1>{job.title}</h1>

        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Type:</strong> {job.jobType}</p>

        {job.salary && (
          <p><strong>Salary:</strong> {job.salary}</p>
        )}

        <h3>Description</h3>
        <p>{job.description}</p>

        <button style={styles.applyBtn} onClick={applyJob}>
          Apply for Job
        </button>
        
      </div>
    </div>
  );
};

const styles = {
  page: {
    background: "#f5f6f8",
    minHeight: "100vh",
    padding: "40px",
  },
  card: {
    background: "white",
    maxWidth: "800px",
    margin: "auto",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
  },
  applyBtn: {
    marginTop: "20px",
    padding: "12px",
    background: "#111",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default JobDetails;
