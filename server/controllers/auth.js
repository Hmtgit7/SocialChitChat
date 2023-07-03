import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */

//res data from backend to frontend  we get from the frontend
//res what we are sending back to the frontend

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            impressions: Math.floor(Math.random()),
            viewedProfile: Math.floor(Math.random())
        })

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}


/* LOGIN USER */

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user =await User.findOne({email:email});
        if(!user) return res.status(400).json({msg:"User Does Not Exist!!!😒"});

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({msg:"Invalid Credential!!!😒"})

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET );
        delete user.password;
        res.status(200).json({token,user});
        
    } catch (err) {
        res.status(500).json({error:err.message});
    } 
}