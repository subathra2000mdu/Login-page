import express from "express";
import { createJob, getJobs, deleteJob,applyJob, getAppliedJobs,
    getMyJobs,getJobById,getApplicants,} from "../controller/jobController.js";
import { isAuthenticated } from "../util/cookieSection.js"; // This already exists
// import { getAppliedJobs } from "../controller/jobController.js";

const router = express.Router();

// Employer — Create Job
router.post("/create", isAuthenticated, createJob);

// Public — Get All Jobs
router.get("/all", getJobs);

router.delete("/delete/:id", isAuthenticated, deleteJob);

router.post("/apply/:id", isAuthenticated, applyJob);

router.get("/applied", isAuthenticated, getAppliedJobs);

router.get("/my-jobs", isAuthenticated, getMyJobs);

router.get("/:id", getJobById);

router.get("/:id/applicants", isAuthenticated, getApplicants);
// router.put("/update/:id", isAuthenticated, updateJob);



export default router;
