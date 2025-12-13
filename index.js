// import express
const express = require("express");
const app = express();

// env config
require("dotenv").config();

// database connection
const dbConnection = require("./config/DatabseConnetion");
dbConnection();

// port
const PORT = process.env.PORT || 5000;

// cors
const cors = require("cors");

// allowed frontend URLs
const allowedOrigins = [
  "http://localhost:5173", // local dev
  "https://my-netlify-frontend.netlify.app", // production
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow Postman / server requests
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

// VERY IMPORTANT for Vercel (preflight requests)
app.options("*", cors());

// cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes (ONLY ONCE)
const movieRouter = require("./Router/movieRouter");
app.use("/api/users", movieRouter);

// test route
app.get("/", (req, res) => {
  res.send("<h1>🚀 Backend is running successfully</h1>");
});

// server listen
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
