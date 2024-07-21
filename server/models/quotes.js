import mongoose from "mongoose";

const quotesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  quote: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Quotes = mongoose.model("Quotes", quotesSchema);

export default Quotes;
