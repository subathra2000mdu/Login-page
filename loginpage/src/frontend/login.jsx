// src/Login.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    console.log("Login data:", form);
    // TODO: call API here
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Sign in to your account</h2>
        <p className="auth-subtitle">
          Welcome back! Please sign in to continue
        </p>

        <div className="auth-social-row">
          <button type="button" className="auth-social-btn text-black">
          <span className="auth-social-icon fa-brands fa-google"></span>
            Google
          </button>
          <button type="button" className="auth-social-btn  text-black">
            <span className="auth-social-icon fa-brands fa-github"></span>
            GitHub
          </button>
        </div>

        <div className="auth-divider">
          <span className="line" />
          <span className="or">or</span>
          <span className="line" />
        </div>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
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

          <button type="submit" className="auth-primary-btn">
            Continue ▸
          </button>
        </form>

        <p className="auth-footer-text">
          Don’t have an account?{" "}
          <Link to="/register" className="auth-link">
            Sign up
          </Link>
        </p>

        <p className="auth-secured">Secured by you 🔒</p>
      </div>
    </div>
  );
};

export default Login;
