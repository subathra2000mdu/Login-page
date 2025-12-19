// Server/models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    // jobseeker | employer
    role: {
      type: String,
      enum: ["jobseeker", "employer"],
      default: "jobseeker",
    },

    // ---------- Job Seeker profile ----------
    phone: { type: String },
    address: { type: String },
    skills: [{ type: String }],
    resumeUrl: { type: String }, // PDF path

    // ---------- Employer profile ----------
    companyName: { type: String },
    companyDescription: { type: String },
    companyWebsite: { type: String },
    companyLocation: { type: String },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
