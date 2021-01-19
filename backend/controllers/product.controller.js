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
    await Product.findById(req.params.id, (err, product) => {
        if (err) res.status(400).send(err);
        res.json(product);
    });
});

export { getProductList, getProductDetails };
