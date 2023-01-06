import express from "express";
import { authorization, verifyToken, verifyTokenAdmin } from "../middleware/verifyToken.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/", verifyToken, async(req,res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart); 
    } catch (error) {
        res.status(500).json(error.message); 
    }
});

router.put("/:id", authorization ,async(req,res) => {
    try {
        const updateCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{
            new: true
        });
        
        res.status(200).json(updateCart);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.delete("/:id", authorization, async(req,res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted");
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.get("/find/:userId", authorization,async(req,res) => {
    try {
        const cart = await Cart.findById(req.params.id);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.get("/", verifyTokenAdmin ,async(req,res)=> {   
  try {
    const cart = await Cart.find();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error.message);
  }
});


export default router;