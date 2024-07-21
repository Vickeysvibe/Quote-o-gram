import express from "express";
import { verifyTokens } from "../middlewares/verifyTokens.js";
import {
  commentOnQuote,
  createQuote,
  deleteQuote,
  editQuote,
  getQuotes,
  getUserQuotes,
  likeQuote,
} from "../controllers/quote.js";

const router = express.Router();

router.get("/", verifyTokens, getQuotes);
router.get("/:id", verifyTokens, getUserQuotes);
router.post("/newQuote", verifyTokens, createQuote);
router.post("/:id", verifyTokens, editQuote);
router.delete("/:id", verifyTokens, deleteQuote);
router.put("/:id", verifyTokens, likeQuote);
router.put("/:id/comment", verifyTokens, commentOnQuote);

export default router;
