import express from "express";
import { verifyTokenAdmin } from "../middleware/verifyToken.js";
import Product from "../models/Product.js";

const router = express.Router();

router.post("/", verifyTokenAdmin, async(req,res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct); 
    } catch (error) {
        res.status(500).json(error.message); 
    }
});

router.put("/:id", verifyTokenAdmin ,async(req,res) => {
    try {
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{
            new: true
        });
        
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

//yoi bred hoohohoho

router.delete("/:id", verifyTokenAdmin, async(req,res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted");
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.get("/find/:id", async(req,res) => {
    try {
        const product = await Product.findById(req.params.id);
        const { password, ...others } = product._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.get("/" , async(req,res)=> {
    const qNew = req.query.new;       
    const qCategory = req.query.category;       
  try {
    let products;
    if(qNew) {
        products = await Product.find().sort({createdAt: -1}).limit(5);
    } else if(qCategory) {
        products = await Product.find({
            categories: {
                $in: [qCategory]
            }
        })
    } else {
        products = await Product.find();
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error.message);
  }
});


export default router;
