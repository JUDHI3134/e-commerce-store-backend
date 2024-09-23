import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb.js";

// App config 
const app = express();
const port = process.env.PORT || 4000

// middlewares 
app.use(express.json());
app.use(cors());
connectDB();

// api endpoint 

app.get("/",(req,res)=>{
    res.send("Hii This is our first server")
})

app.listen(port,()=>{
    console.log(`server running port no. ${port}`);
    
})