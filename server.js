import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";

// App config 
const app = express();
const port = process.env.PORT || 4000

// middlewares 
app.use(express.json());
app.use(cors());
connectDB();
connectCloudinary()

// api endpoint 

app.use("/api/user",userRouter)

app.get("/",(req,res)=>{
    res.send("Hii This is our first server")
})

app.listen(port,()=>{
    console.log(`server running port no. ${port}`);
    
})