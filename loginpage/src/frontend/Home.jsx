import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="home">
      <nav className="home-nav">
        <h2>Job Portal</h2>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register" className="home-btn">
            Sign Up
          </Link>
        </div>
      </nav>

      <section className="hero">
        <h1>Find Your Dream Job Today</h1>
        <p>
          Connect with top companies and discover opportunities that match
          your skills.
        </p>

        <div className="hero-buttons">
          <Link to="/jobs" className="primary">
            Browse Jobs
          </Link>

          <Link to="/create-job" className="secondary">
            Post a Job
          </Link>
        </div>
      </section>

      <section className="features">
        <div>
          <h3>Thousands of Jobs</h3>
          <p>Explore opportunities across industries.</p>
        </div>

        <div>
          <h3>Easy Apply</h3>
          <p>Apply to jobs with one click.</p>
        </div>

        <div>
          <h3>Hire Talent Fast</h3>
          <p>Post jobs and hire candidates quickly.</p>
        </div>
      </section>

      <footer className="footer">
        © 2026 Job Portal. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
