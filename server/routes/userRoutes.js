import express from "express";
import { verifyTokens } from "../middlewares/verifyTokens.js";
import {
  currentProfile,
  editProfile,
  getProfile,
} from "../controllers/user.js";

const router = express.Router();

router.get("/myProfile", verifyTokens, currentProfile);
router.post("/myProfile/edit", verifyTokens, editProfile);
router.get("/:id", verifyTokens, getProfile);

export default router;
