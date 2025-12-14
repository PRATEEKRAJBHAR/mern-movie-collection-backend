// // import express
// const express=require("express");
// const app=express();
// // database connction with backend
// const dbConnection=require("./config/DatabseConnetion")
// dbConnection();
// // env se PORT import karne  k liye
// require("dotenv").config();
// const PORT= process.env.PORT||5000;
// // connect front-end to back-end
// // const cors=require('cors')
// // // app.use(cors());
// // app.use(cors({
// //   origin: "http://localhost:5173",
// //   credentials: true
// // }));
// const cors = require("cors");

// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://mern-movie-collection-frontend.vercel.app"
//   ],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
// }));

// const cookie=require("cookie-parser")
// app.use(cookie());
// // middle ware
// app.use(express.json());




// // movie \

// const movies=require('./Router/movieRouter')
// const createmovies=require('./Router/movieRouter')
// const getmovie=require('./Router/movieRouter')
// const updateMovie=require('./Router/movieRouter')
// const deleteMovie=require('./Router/movieRouter')
// const MovieregisterUser=require('./Router/movieRouter');
// const MovieloginUser=require("./Router/movieRouter")
// app.use('/api/users',movies)
// app.use('/api/users',createmovies)
// app.use('/api/users',getmovie)
// app.use('/api/users',updateMovie)
// app.use('/api/users',deleteMovie)
// app.use("/api/users",MovieregisterUser)
// app.use("/api/users",MovieloginUser)



// // server listen

// app.listen(PORT,()=>{
//     console.log(`serever listent port number:${PORT}`);
// })

// // CHECK every thing ok or not

// app.get("/",(req,res)=>{
//     res.send(`<h1>jai baba barfani</h1>`)
// })


const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// IMPORTANT for Vercel
app.set("trust proxy", 1);

// DB
const dbConnection = require("./config/DatabseConnetion");
dbConnection();

// Middleware
app.use(cors({
  origin: "https://mern-movie-collection-frontend.vercel.app",
  credentials: true,
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
