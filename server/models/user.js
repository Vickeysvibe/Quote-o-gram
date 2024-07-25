import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  description: { type: String, default: "Hey!, i'm new" },
  profilePic: {
    type: String,
    default:
      "https://i.pinimg.com/236x/47/ba/71/47ba71f457434319819ac4a7cbd9988e.jpg",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
