import { uploadImageFromBuffer } from "../middlewares/uploadMiddleware.js";
import User from "../models/User.js";
import Friend from "../models/Friend.js";

export const authMe = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const searchUserByUsername = async (req, res) => {
  try {
    const { username } = req.query;
    const userId = req.user._id;

    if (!username || username.trim() === "") {
      return res
        .status(400)
        .json({ message: "Username query parameter is required." });
    }

    const user = await User.findOne({ username }).select(
      "_id displayName username avatarUrl",
    );

    if (!user) {
      return res.status(200).json({ user: null });
    }

    // Don't allow users to search for themselves
    if (user._id.toString() === userId.toString()) {
      return res.status(200).json({ user: null, reason: "self" });
    }

    // Check if they're already friends
    let userA = userId.toString();
    let userB = user._id.toString();

    if (userA > userB) {
      [userA, userB] = [userB, userA];
    }

    const isFriend = await Friend.findOne({ userA, userB });

    if (isFriend) {
      return res.status(200).json({ user: null, reason: "friend" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error occurred while searching user by username", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const uploadAvatar = async (req, res) => {
  try {
    const file = req.file;
    const userId = req.user._id;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await uploadImageFromBuffer(file.buffer);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        avatarUrl: result.secure_url,
        avatarId: result.public_id,
      },
      {
        new: true,
      },
    ).select("avatarUrl");

    if (!updatedUser.avatarUrl) {
      return res.status(400).json({ message: "Avatar return null" });
    }

    return res.status(200).json({ avatarUrl: updatedUser.avatarUrl });
  } catch (error) {
    console.error("Error upload avatar", error);
    return res.status(500).json({ message: "Upload failed" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { displayName, username, email, bio } = req.body;

    // Basic validation
    if (username && typeof username === "string") {
      const existing = await User.findOne({ username });
      if (existing && existing._id.toString() !== userId.toString()) {
        return res.status(400).json({ message: "Username is already taken" });
      }
    }

    if (email && typeof email === "string") {
      const existingEmail = await User.findOne({ email });
      if (existingEmail && existingEmail._id.toString() !== userId.toString()) {
        return res.status(400).json({ message: "Email is already used" });
      }
    }

    const updated = await User.findByIdAndUpdate(
      userId,
      {
        ...(displayName !== undefined && { displayName }),
        ...(username !== undefined && { username }),
        ...(email !== undefined && { email }),
        ...(bio !== undefined && { bio }),
      },
      { new: true },
    ).select("_id displayName username email bio avatarUrl");

    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user: updated });
  } catch (error) {
    console.error("Error updating profile", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
