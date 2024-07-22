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
  getComments,
  getCommentsOnPost,
  getOneQuote,
} from "../controllers/quote.js";

const router = express.Router();

router.get("/", verifyTokens, getQuotes);
router.get("/:id", verifyTokens, getOneQuote);
router.get("/:id/userQuotes", verifyTokens, getUserQuotes);
router.post("/newQuote", verifyTokens, createQuote);
router.post("/:id", verifyTokens, editQuote);
router.delete("/:id", verifyTokens, deleteQuote);
router.put("/:id", verifyTokens, likeQuote);
router.put("/:id/comment", verifyTokens, commentOnQuote);
router.get("/comments", verifyTokens, getComments);
router.get("/:id/comments", verifyTokens, getCommentsOnPost);
export default router;
