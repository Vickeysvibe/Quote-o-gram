import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  description: { type: String, default: "Hey!, i'm new" },
  profilePic: {
    type: String,
    default:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonduck.com%2Ficons%2F6491%2Fprofile-default&psig=AOvVaw3ZL5IfMVTiY8bqvnK_Zdlx&ust=1721546866500000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJj8gv6LtYcDFQAAAAAdAAAAABAE",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
