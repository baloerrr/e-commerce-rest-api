import express from "express";
import CryptoJS from "crypto-js";
import User from "../models/User.js";
import { verifyTokenAdmin, verifyToken, verifyAndAuthorization } from "../middleware/verifyToken.js";

const router = express.Router();

router.put("/:id", verifyAndAuthorization ,async(req,res) => {
    if(req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{
            new: true
        });
        
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.delete("/:id", verifyAndAuthorization, async(req,res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.get("/find/:id", verifyTokenAdmin, async(req,res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.get("/" ,verifyTokenAdmin ,async(req,res)=> {
    const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(1)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get("/stats", verifyTokenAdmin, async(req,res)=> {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            {
                $match: {
                    createdAt: {$gte: lastYear}
                }
            },
            {
                $project: {
                    month: { $month: "$createdAt"}
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum : 1 }
                }
            }
        ]);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error.message);
    }
})



export default router;
