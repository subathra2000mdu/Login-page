// Server/controller/profileController.js
import User from "../models/userModel.js";

// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Profile fetch failed",
      error: error.message,
    });
  }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Profile update failed",
      error: error.message,
    });
  }
};

// UPLOAD RESUME PATH
export const saveResumePath = async (req, res) => {
  try {
    const resumeUrl = `/uploads/resumes/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { resumeUrl },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      message: "Resume uploaded successfully",
      resumeUrl,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Resume upload failed",
      error: error.message,
    });
  }
};
