import validator from "validator"
import userModel from "../models/UserModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Route for User Login

const loginUser = async (req,res) =>{
    try {
        const {email,password} = req.body;

        const user = await userModel.findOne({email});
        if(!user){
            res.json({success:false,message:"User does not exist."})
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            const token = createToken(user._id);
            res.json({success:true,token})
        }else{
            res.json({success:false,message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}


//Route for user Register

const registerUser = async (req,res) =>{

    try {
        const {name, email, password} = req.body;
    
        //checking email already exist
        const exist = await userModel.findOne({email})
    
        if(exist){
            return res.json({success: false, message:"User Already Exist"})
        }
        //validating email format and password
        if(!validator.isEmail(email)){
            return res.json({success: false, message:"Please Enter a valid Email"})
        }
        if(password.length < 8){
            return res.json({success: false, message:"Please Enter a Strong Password"})
        }
    
        //hasing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
    
        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })
    
        const user = await newUser.save();
    
        //after save generate a token
    
        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }


}


//route for admin Login

const adminLogin = async (req,res) =>{

}



export {loginUser , registerUser, adminLogin}