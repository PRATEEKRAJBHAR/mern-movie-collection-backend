const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.movieAuth = (req, res, next) => {
  try {
    // Token from cookie or Authorization header
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing. Please login." });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    // decoded must contain id, role etc.
    req.user = decoded;
    next();
  } catch (err) {
  console.error("JWT ERROR 👉", err.message);
  return res.status(401).json({
    success: false,
    message: "Invalid or expired token"
  });
}

};
