import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        require: true,
    },
    img: {
        type: String,
        require: true,
    },
    categories: {
        type: Array,
        require: true,
    },
    size: {
        type: String,
        require: true,
    },
    color: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true
    }

}, {
    timestamps: true
});

export default mongoose.model("Product", productSchema);