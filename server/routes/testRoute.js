import express from "express";
import Comments from "../models/comments.js";
import Quotes from "../models/quotes.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.send("hello world");
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/update", async (req, res) => {
  try {
    // Get all comments
    const comments = await Comments.find();

    for (const comment of comments) {
      // Add each comment's ID to the corresponding Quote's `comments` array
      await Quotes.findByIdAndUpdate(comment.quote, {
        $push: { comments: comment._id },
      });
      await Comments.findByIdAndUpdate(comment._id, { $unset: { quote: "" } });
    }
    console.log("Migration complete!");
  } catch (error) {
    console.error("Migration failed:", error);
  }
});
export default router;
