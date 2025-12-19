// Server/controller/jobController.js
import Job from "../models/jobModel.js";

// ===================== CREATE JOB =====================

export const createJob = async (req, res) => {
  try {
    const { title, company, location, jobType, description, salary } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      jobType,
      description,
      salary,
      createdBy: req.user?.id || null,
    });

    return res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job,
    });
  } catch (error) {
    console.error("Create job error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ===================== DELETE JOB =====================

export const deleteJob = async (req, res) => {
    try {
      const jobId = req.params.id;
  
      const job = await Job.findById(jobId);
  
      if (!job) {
        return res.status(404).json({
          success: false,
          message: "Job not found",
        });
      }
  
      // Optional: restrict delete to creator only
      if (job.createdBy?.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to delete this job",
        });
      }
  
      await Job.findByIdAndDelete(jobId);
  
      return res.status(200).json({
        success: true,
        message: "Job deleted successfully",
      });
    } catch (error) {
      console.error("Delete job error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
  
// ===================== GET ALL JOBS =====================

export const getJobs = async (req, res) => {
  try {
    const { search, location, type } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (type && type !== "All") {
      query.jobType = type;
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    return res.json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Get jobs error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
