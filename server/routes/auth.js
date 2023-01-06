import express from "express";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req,res) => {
    const { username, email, password } = req.body;

    const newUser = new User({
        username: username,
        email: email,
        password: CryptoJS.AES.encrypt(password, process.env.PASS_SEC),
    });

    try {
        await newUser.save();
        res.status(200).json("Register Success");
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.post("/login", async(req,res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({username: username});
    
        if(!user) return res.status(404).json("username doesn't exist");
    
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if(originalPassword !== req.body.password) return res.status(401).json("Wrong Password");

        const accessToken = await jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SEC, {
            expiresIn: "3d"
        });

        const { password, ...others } = user._doc;

        res.status(200).json({...others, accessToken});
        
    } catch (error) {
       res.status(500).json(error.message); 
    }
});

export default router;