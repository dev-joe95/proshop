// import mongoose from"mongoose";
import Product from "../models/product.js";

const getAll = async (req, res) => {
    await Product.find({}, (err, product) => {
        if (err) res.status(400).send(err);
        res.json(product);
    }).sort("name");
};

const getById = async (req, res) => {
    await Product.findById(req.params.id, (err, product) => {
        if (err) res.status(400).send(err);
        res.json(product);
    });
};

export { getAll, getById };
