import mongoose from "mongoose";

const connectDB = async (url) => {
  mongoose.connect(url).then(console.log(`database connected successfully`));
};

export default connectDB;
