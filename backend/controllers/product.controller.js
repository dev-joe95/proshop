import asyncHandler from "express-async-handler";
import Product from "../models/product.js";

const getAll = asyncHandler(async (req, res) => {
    await Product.find({}, (err, product) => {
        if (err) res.status(400).send(err);
        res.json(product);
    }).sort("name");
});

const getById = asyncHandler(async (req, res) => {
    await Product.findById(req.params.id, (err, product) => {
        if (err) res.status(400).send(err);
        res.json(product);
    });
})

export { getAll, getById };
