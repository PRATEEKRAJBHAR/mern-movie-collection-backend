
const mongoose=require("mongoose");
require("dotenv").config();
const dbConnection=()=>{
    try{
        mongoose.connect(process.env.DATABASE_URL);
        console.log("database connect successfully");
    }catch(err){

        console.log("some thing wernt wrong",err);
    }
}
module.exports=dbConnection;



