import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.send("hello world");
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
