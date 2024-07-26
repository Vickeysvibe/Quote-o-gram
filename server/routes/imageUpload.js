import { Router } from "express";
const router = Router();
import cloudinary from "../utils/cloudinary.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
import User from "../models/user.js";

router.post("/", upload.single("profilePic"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const user = await User.findById(req.body.userId);
    user.profilePic = result.secure_url;
    await user.save();
    res.status(200).json({ profilePic: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: "Image upload failed" });
  }
});

export default router;
