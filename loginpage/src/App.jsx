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


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-job" element={<CreateJob />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs" element={<JobList />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
