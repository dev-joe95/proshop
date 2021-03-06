import asyncHandler from "express-async-handler";
import Category from "../models/category.js";

const getCategoryList = asyncHandler(async (req, res) => {
    await Category.find({}, (err, category) => {
        if (err) res.status(400).send(err);
        res.json(category);
    }).sort("name");
});

const getCategoryDetails = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (category) {
        res.json(category);
    } else {
        res.status(400);
        throw new Error("Category not found");
    }
});
const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
        await category.remove();

        res.json({ message: "Category successfully deleted" });
    } else {
        res.status(404);
        throw new Error("Category not found");
    }
});
const createCategory = asyncHandler(async (req, res) => {
    const category = new Category({
        name: "Sample name",
    });
    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
});

const updateCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
        category.name = req.body.name;

        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } else {
        res.status(404);
        throw new Error("Category not found");
    }
});
export {
    getCategoryList,
    getCategoryDetails,
    deleteCategory,
    createCategory,
    updateCategory,
};
