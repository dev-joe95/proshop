import asyncHandler from "express-async-handler";
import Product from "../models/product.js";

const getProductList = asyncHandler(async (req, res) => {
    await Product.find({}, (err, product) => {
        if (err) res.status(400).send(err);
        res.json(product);
    })
        .sort("-updatedAt")
        .populate("user")
        .populate("category");
});

const getProductDetails = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();

        res.json({ message: "Product successfully deleted" });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

export { getProductList, getProductDetails, deleteProduct };
