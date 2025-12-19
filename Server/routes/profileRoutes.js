// Server/routes/profileRoutes.js
import express from "express";
import {
  getProfile,
  updateProfile,
  saveResumePath,
} from "../controller/profileController.js";
import { isAuthenticated } from "../util/cookieSection.js";
import { uploadResume } from "../util/uploadResume.js";

const router = express.Router();

// GET logged in user's profile
router.get("/me", isAuthenticated, getProfile);

// UPDATE profile (job seeker or employer)
router.put("/update", isAuthenticated, updateProfile);

// UPLOAD resume (PDF)
router.post(
  "/upload-resume",
  isAuthenticated,
  uploadResume.single("resume"),
  saveResumePath
);

export default router;
