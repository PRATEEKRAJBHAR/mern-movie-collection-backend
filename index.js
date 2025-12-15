const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.set("trust proxy", 1);

// DB
const dbConnection = require("./config/DatabseConnetion");
dbConnection();

// CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5175",
  "https://mern-movie-collection-frontend.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
const movieRouter = require("./Router/movieRouter");
app.use("/api/users", movieRouter);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ❌ REMOVE app.listen()
// ✅ EXPORT APP FOR VERCEL
module.exports = app;
