// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./frontend/login";
import Register from "./frontend/Register";
import "./frontend/Auth.css";
import "./frontend/login.css";
import CreateJob from "./frontend/CreateJob";
import Profile from "./frontend/Profile";
import JobList from "./frontend/JobList";
import AppliedJobs from "./frontend/AppliedJobs";
import MyJobs from "./frontend/MyJobs";
import JobDetails from "./frontend/JobDetails";
import Applicants from "./frontend/Applicants";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./frontend/Dashboard";
import Navbar from "./frontend/Navbar";
import Home from "./frontend/Home";


function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
     <Routes>
     <Route path="/" element={<Home />} />    
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />

  <Route path="/jobs" element={
    <ProtectedRoute>
      <Navbar />
      <JobList />
    </ProtectedRoute>
  } />

  <Route path="/dashboard" element={
    <ProtectedRoute>
      <Navbar />
      <Dashboard />
    </ProtectedRoute>
  } />

  <Route path="/create-job" element={<CreateJob />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/applied" element={<AppliedJobs />} />
  <Route path="/my-jobs" element={<MyJobs />} />
  <Route path="/jobs/:id" element={<JobDetails />} />
  <Route path="/jobs/:id/applicants" element={<Applicants />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;
