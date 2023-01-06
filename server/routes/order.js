import express from "express";
import User from "../models/User.js";
import { authorization, verifyTokenAdmin, verifyToken } from "../middleware/verifyToken.js";
import Order from "../models/Order.js";

const router = express.Router();

router.post("/", verifyToken, async(req,res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder); 
    } catch (error) {
        res.status(500).json(error.message); 
    }
});

router.put("/:id", verifyTokenAdmin ,async(req,res) => {
    try {
        const updateOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{
            new: true
        });
        
        res.status(200).json(updateOrder);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.delete("/:id", verifyTokenAdmin, async(req,res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted");
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.get("/find/userId", authorization, async(req,res) => {
    try {
        const order = await User.findById({userId: req.params.userId});
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.get("/" ,verifyTokenAdmin ,async(req,res)=> {
  try {
    const order = await Order.find();
    res.status(200).json(orderoe.message);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/income", verifyTokenAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(error.message);
    }
  });


export default router;