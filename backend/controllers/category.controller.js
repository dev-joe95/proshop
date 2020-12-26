import asyncHandler from "express-async-handler";
import Category from "../models/category.js";

const getAll = asyncHandler(async (req, res) => {
    await Category.find({}, (err, category) => {
        if (err) res.status(400).send(err);
        res.json(category);
    }).sort("name");
});

const getById = asyncHandler(async (req, res) => {
    await Category.findById(req.params.id, (err, category) => {
        if (err) res.status(400).send(err);
        res.json(category);
    });
});

export { getAll, getById };
