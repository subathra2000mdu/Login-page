// src/frontend/login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");

    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // so JWT cookie is stored
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log("Login result:", data);

      if (!data.success) {
        // message comes from your backend (Invalid Password, User not Exist, etc.)
        setError(data.message || "Login failed.");
        return;
      }

      // ✅ success
      alert("Logged in successfully!");
      // later we can navigate to /dashboard – for now stay on home
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    }
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
          <button type="button" className="auth-social-btn text-black">
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
