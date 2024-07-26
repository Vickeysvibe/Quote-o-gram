import express from "express";
import bodyParser from "body-parser";
import connectDB from "./utils/connectDB.js";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";

//CONFIGURATION
dotenv.config();
const app = express();

//MIDDLEWARES
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const corsOptions = {
  origin: "https://quote-o-gram.vercel.app", // Allow all origins (adjust this to be more secure)
};

app.use(cors(corsOptions));

//CONNECT TO MONGODB
connectDB(process.env.MONGODB_URL);

//ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/quotes", quoteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
