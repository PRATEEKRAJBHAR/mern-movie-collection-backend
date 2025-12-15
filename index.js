const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
app.set("trust proxy", 1);

// DB
const dbConnection = require("./config/DatabseConnetion");
dbConnection();

// ✅ FIXED CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5175",
  "https://mern-movie-collection-frontend.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Postman / server-to-server requests
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use(express.json());
app.use(cookieParser());

// Routes
const movieRouter = require("./Router/movieRouter");
app.use("/api/users", movieRouter);

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
