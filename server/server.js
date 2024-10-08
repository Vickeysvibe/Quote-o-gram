import express from "express";
import bodyParser from "body-parser";
import connectDB from "./utils/connectDB.js";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";
import testRoute from "./routes/testRoute.js";

// CONFIGURATION
dotenv.config();
const app = express();

// MIDDLEWARES
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// CONNECT TO MONGODB
connectDB(process.env.MONGODB_URL);
app.use(cors());

// ROUTES
app.use("/", testRoute);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/quotes", quoteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
