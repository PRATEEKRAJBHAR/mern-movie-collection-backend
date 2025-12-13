// import express
const express=require("express");
const app=express();
// database connction with backend
const dbConnection=require("./config/DatabseConnetion")
dbConnection();
// env se PORT import karne  k liye
require("dotenv").config();
const PORT= process.env.PORT||5000;
// connect front-end to back-end
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173", // dev
  "https://my-netlify-frontend.netlify.app", // production
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow non-browser requests like Postman
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // allow cookies
  })
);


const cookie=require("cookie-parser")
app.use(cookie());
// middle ware
app.use(express.json());




// movie \

const movies=require('./Router/movieRouter')
const createmovies=require('./Router/movieRouter')
const getmovie=require('./Router/movieRouter')
const updateMovie=require('./Router/movieRouter')
const deleteMovie=require('./Router/movieRouter')
const MovieregisterUser=require('./Router/movieRouter');
const MovieloginUser=require("./Router/movieRouter")

app.use('/api/users',movies)
app.use('/api/users',createmovies)
app.use('/api/users',getmovie)
app.use('/api/users',updateMovie)
app.use('/api/users',deleteMovie)
app.use("/api/users",MovieregisterUser)
app.use("/api/users",MovieloginUser)



// server listen

app.listen(PORT,()=>{
    console.log(`serever listent port number:${PORT}`);
})

// CHECK every thing ok or not

app.get("/",(req,res)=>{
    res.send(`<h1>jai baba barfani</h1>`)
})



