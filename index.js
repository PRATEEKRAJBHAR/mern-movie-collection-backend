const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.set("trust proxy", 1);

// DB
const dbConnection = require("./config/DatabseConnetion");
dbConnection();

// ✅ SAFE CORS (NO ERROR THROW)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5175",
    "https://mern-movie-collection-frontend.vercel.app"
  ],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Routes
const movieRouter = require("./Router/movieRouter");
app.use("/api/users", movieRouter);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
