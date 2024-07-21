import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  quote: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quotes",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comments = mongoose.model("Comments", commentSchema);

export default Comments;
