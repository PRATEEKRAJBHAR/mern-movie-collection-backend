const express = require("express");
const app = express();
require("dotenv").config();

// database
const dbConnection = require("./config/DatabseConnetion");
dbConnection();

// cors
const cors = require("cors");
const allowedOrigins = [
  "http://localhost:5173",
  "https://my-netlify-frontend.netlify.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// middleware
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const movieRouter = require("./Router/movieRouter");
app.use("/api/users", movieRouter);

// test route
app.get("/", (req, res) => {
  res.send("<h1>🚀 Backend running</h1>");
});

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
