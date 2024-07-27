import express from "express";
import bodyParser from "body-parser";
import connectDB from "./utils/connectDB.js";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";
import testRoute from "./routes/testRoute.js";
import imageUpload from "./routes/imageUpload.js";

// CONFIGURATION
dotenv.config();
const app = express();

// MIDDLEWARES
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// CONNECT TO MONGODB
connectDB(process.env.MONGODB_URL);

// CORS CONFIGURATION
const corsOptions = {
  origin: "https://quote-o-gram.vercel.app",
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://quote-o-gram.vercel.app"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// ROUTES
app.use("/", testRoute);
app.use("/api/uploadProfilePic", imageUpload);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/quotes", quoteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
