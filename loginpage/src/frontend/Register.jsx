// src/Register.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    console.log("Register data:", form);
    // TODO: call register API here
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create your account</h2>
        <p className="auth-subtitle">
          Sign up to get started with our app
        </p>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-label">
            Full name
            <input
              className="auth-input"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </label>

          <label className="auth-label">
            Email address
            <input
              className="auth-input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </label>

          <label className="auth-label">
            Password
            <input
              className="auth-input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </label>

          <label className="auth-label">
            Confirm password
            <input
              className="auth-input"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </label>

          <button type="submit" className="auth-primary-btn">
            Sign up ▸
          </button>
        </form>

        <p className="auth-footer-text">
          Already have an account?{" "}
          <Link to="/" className="auth-link">
            Sign in
          </Link>
        </p>

        <p className="auth-secured">We keep your data safe 🔒</p>
      </div>
    </div>
  );
};

export default Register;
