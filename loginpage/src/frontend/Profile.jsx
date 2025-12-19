// src/frontend/Profile.jsx
import React, { useEffect, useState } from "react";
import "./Auth.css"; // reuse nice card styles

const API_BASE = "http://localhost:4000";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    role: "jobseeker",
    phone: "",
    address: "",
    skills: "",
    companyName: "",
    companyDescription: "",
    companyWebsite: "",
    companyLocation: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // load profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/profile/me`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
          setForm({
            role: data.user.role || "jobseeker",
            phone: data.user.phone || "",
            address: data.user.address || "",
            skills: (data.user.skills || []).join(", "),
            companyName: data.user.companyName || "",
            companyDescription: data.user.companyDescription || "",
            companyWebsite: data.user.companyWebsite || "",
            companyLocation: data.user.companyLocation || "",
          });
        } else {
          setError(data.message || "Failed to load profile");
        }
      } catch (err) {
        setError("Network error while loading profile");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const payload = {
        ...form,
        skills: form.skills
          ? form.skills.split(",").map((s) => s.trim()).filter(Boolean)
          : [],
      };

      const res = await fetch(`${API_BASE}/api/profile/update`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message || "Failed to update profile");
        return;
      }

      setMessage("Profile updated successfully.");
      setUser(data.user);
    } catch {
      setError("Network error while saving profile");
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError("");
    setMessage("");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch(`${API_BASE}/api/profile/upload-resume`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.message || "Resume upload failed");
        return;
      }

      setMessage("Resume uploaded successfully.");
      setUser(data.user);
    } catch {
      setError("Network error while uploading resume");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: 600 }}>
        <h2 className="auth-title">Profile Management</h2>
        <p className="auth-subtitle">
          Update your personal details and (for employers) company information.
        </p>

        {user && (
          <p className="auth-footer-text" style={{ marginBottom: "1rem" }}>
            Logged in as <strong>{user.name}</strong> ({user.email})
          </p>
        )}

        {error && <p className="auth-error">{error}</p>}
        {message && (
          <p style={{ color: "#16a34a", fontSize: "0.85rem" }}>{message}</p>
        )}

        <form className="auth-form" onSubmit={handleSave}>
          {/* Role selection */}
          <label className="auth-label">
            Role
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="auth-input"
            >
              <option value="jobseeker">Job Seeker</option>
              <option value="employer">Employer</option>
            </select>
          </label>

          {/* Common fields */}
          <label className="auth-label">
            Phone
            <input
              className="auth-input"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Contact number"
            />
          </label>

          <label className="auth-label">
            Address
            <input
              className="auth-input"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="City, Country"
            />
          </label>

          {/* Job seeker fields */}
          {form.role === "jobseeker" && (
            <>
              <label className="auth-label">
                Skills
                <input
                  className="auth-input"
                  name="skills"
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB"
                />
              </label>

              <label className="auth-label">
                Resume (PDF)
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeUpload}
                  className="auth-input"
                />
              </label>

              {user?.resumeUrl && (
                <p className="auth-footer-text">
                  Current resume:{" "}
                  <a
                    href={`${API_BASE}${user.resumeUrl}`}
                    target="_blank"
                    rel="noreferrer"
                    className="auth-link"
                  >
                    View Resume
                  </a>
                </p>
              )}
            </>
          )}

          {/* Employer fields */}
          {form.role === "employer" && (
            <>
              <label className="auth-label">
                Company Name
                <input
                  className="auth-input"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  placeholder="Company name"
                />
              </label>

              <label className="auth-label">
                Company Description
                <input
                  className="auth-input"
                  name="companyDescription"
                  value={form.companyDescription}
                  onChange={handleChange}
                  placeholder="Short description"
                />
              </label>

              <label className="auth-label">
                Company Website
                <input
                  className="auth-input"
                  name="companyWebsite"
                  value={form.companyWebsite}
                  onChange={handleChange}
                  placeholder="https://example.com"
                />
              </label>

              <label className="auth-label">
                Company Location
                <input
                  className="auth-input"
                  name="companyLocation"
                  value={form.companyLocation}
                  onChange={handleChange}
                  placeholder="City, Country"
                />
              </label>
            </>
          )}

          <button type="submit" className="auth-primary-btn">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
