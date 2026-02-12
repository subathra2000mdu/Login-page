// src/frontend/JobList.jsx
import React, { useEffect, useState } from "react";
import "./jobs.css";
import { useNavigate } from "react-router-dom";


const API_BASE = "http://localhost:4000";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= FETCH JOBS =================
  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (location) params.append("location", location);
      if (type) params.append("type", type);

      const res = await fetch(
        `${API_BASE}/api/jobs/all?${params.toString()}`,
        { credentials: "include" }
      );

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Failed to load jobs");
        setJobs([]);
        return;
      }

      setJobs(data.jobs);
    } catch (err) {
      console.error(err);
      setError("Network error while loading jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // ================= FILTER SUBMIT =================
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  // ================= APPLY JOB =================
  const applyJob = async (jobId) => {
    try {
      const res = await fetch(
        `${API_BASE}/api/jobs/apply/${jobId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();
      alert(data.message || "Applied successfully");
    } catch (err) {
      console.log(err);
      alert("Application failed");
    }
  };

  // ================= DELETE JOB =================
  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      const res = await fetch(
        `${API_BASE}/api/jobs/delete/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      alert("Job deleted successfully");
      fetchJobs();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };
  const navigate = useNavigate();

  return (
    <div className="jobs-page">
      <div className="jobs-inner">
        {/* HEADER */}
        <div className="jobs-header">
          <h1>Find Your Next Job</h1>
          <p>Browse opportunities posted by top companies.</p>
        </div>

        {/* FILTER */}
        <form className="jobs-filters" onSubmit={handleFilterSubmit}>
          <input
            type="text"
            placeholder="Search by title or company"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="All">All types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
          </select>

          <button type="submit">Search</button>
        </form>

        {/* STATUS */}
        {loading && <p className="jobs-info">Loading jobs...</p>}
        {error && <p className="jobs-error">{error}</p>}
        {!loading && !error && jobs.length === 0 && (
          <p className="jobs-info">No jobs found.</p>
        )}

        {/* JOB GRID */}
        <div className="jobs-grid">
          {jobs.map((job) => (
            <div key={job._id} className="job-card">
              <button
  onClick={() => window.location.href = `/jobs/${job._id}/applicants`}
>
  View Applicants
</button>

              <div className="job-card-header">
                <h2>{job.title}</h2>
                <span className="job-type">{job.jobType}</span>
              </div>

              <p className="job-company">{job.company}</p>
              <p className="job-location">{job.location}</p>

              {job.salary && (
                <p className="job-salary">
                  Salary: {job.salary}
                </p>
              )}

              <p className="job-description">
                {job.description?.slice(0, 120)}
                {job.description &&
                  job.description.length > 120 &&
                  "..."}
              </p>

             
              <div className="job-card-footer">
              <button
  className="job-view-btn"
  onClick={() => navigate(`/jobs/${job._id}`)}
>
  View details
</button>


                {/* <button onClick={() => applyJob(job._id)}>Apply</button> */}


                <button
                  style={{
                    background: "#16a34a",
                    color: "white",
                  }}
                  className="job-submit-btn"
                  onClick={() => applyJob(job._id)}
                >
                  Apply
                </button>

                <button
                  className="job-delete-btn"
                  onClick={() => deleteJob(job._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobList;
