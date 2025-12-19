import express from "express";
import { createJob, getJobs, deleteJob } from "../controller/jobController.js";
import { isAuthenticated } from "../util/cookieSection.js"; // This already exists

const router = express.Router();

// Employer — Create Job
router.post("/create", isAuthenticated, createJob);

// Public — Get All Jobs
router.get("/all", getJobs);

router.delete("/delete/:id", isAuthenticated, deleteJob);

export default router;
