// src/frontend/CreateJob.jsx
import React, { useState } from "react";
import "./Auth.css";      // reuse the nice auth card styles
import "./jobForm.css";   // extra styles just for this page

const API_BASE = "http://localhost:4000";

const CreateJob = () => {
  const [data, setData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Full-time",
    description: "",
    salary: "",
  });

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitJob = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/jobs/create`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setError(json.message || "Failed to create job");
        return;
      }

      setMsg("Job created successfully 🎉");
      setData({
        title: "",
        company: "",
        location: "",
        jobType: "Full-time",
        description: "",
        salary: "",
      });
    } catch (err) {
      console.error(err);
      setError("Network error, please try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card job-form-card">
        <h2 className="auth-title">Post a new job</h2>
        <p className="auth-subtitle">
          Share an opportunity with candidates on the platform.
        </p>

        {error && <p className="auth-error">{error}</p>}
        {msg && (
          <p style={{ color: "#16a34a", fontSize: "0.85rem", marginBottom: 8 }}>
            {msg}
          </p>
        )}

        <form className="auth-form job-form-grid" onSubmit={submitJob}>
          <div className="job-form-field">
            <label className="auth-label">
              Job title
              <input
                className="auth-input"
                name="title"
                value={data.title}
                onChange={handleChange}
                placeholder="Frontend Developer"
                required
              />
            </label>
          </div>

          <div className="job-form-field">
            <label className="auth-label">
              Company name
              <input
                className="auth-input"
                name="company"
                value={data.company}
                onChange={handleChange}
                placeholder="Tech Corp"
                required
              />
            </label>
          </div>

          <div className="job-form-field">
            <label className="auth-label">
              Location
              <input
                className="auth-input"
                name="location"
                value={data.location}
                onChange={handleChange}
                placeholder="Bengaluru, India"
                required
              />
            </label>
          </div>

          <div className="job-form-field">
            <label className="auth-label">
              Job type
              <select
                name="jobType"
                value={data.jobType}
                onChange={handleChange}
                className="auth-input"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Internship</option>
                <option>Remote</option>
              </select>
            </label>
          </div>

          <div className="job-form-field job-form-full">
            <label className="auth-label">
              Job description
              <textarea
                className="auth-input job-form-textarea"
                name="description"
                value={data.description}
                onChange={handleChange}
                placeholder="Describe the role, responsibilities, and required skills."
                rows={4}
                required
              />
            </label>
          </div>

          <div className="job-form-field job-form-full">
            <label className="auth-label">
              Salary range (optional)
              <input
                className="auth-input"
                name="salary"
                value={data.salary}
                onChange={handleChange}
                placeholder="₹6,00,000 – ₹10,00,000 per year"
              />
            </label>
          </div>

          <div className="job-form-actions">
            <button type="submit" className="auth-primary-btn">
              Create job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
