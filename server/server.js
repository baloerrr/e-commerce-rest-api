import express from "express";
import db from "./db_init/database.js";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js"
dotenv.config();

const app = express();

db()
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

app.listen(5000, () => {
    console.log("Backend server is running");
})