// Server/controller/profileController.js
import userModel from "../models/userModel.js";

export const getProfile = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user.id)
      .select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;

    const user = await userModel
      .findByIdAndUpdate(req.user.id, updates, { new: true })
      .select("-password");

    res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

export const saveResumePath = async (req, res) => {
  try {
    const resumeUrl = `/uploads/resumes/${req.file.filename}`;

    const user = await userModel
      .findByIdAndUpdate(
        req.user.id,
        { resumeUrl },
        { new: true }
      )
      .select("-password");

    res.json({
      success: true,
      message: "Resume uploaded successfully",
      resumeUrl,
      user,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};
