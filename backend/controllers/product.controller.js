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

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: "Sample name",
        price: 0,
        user: req.user._id,
        image: "/images/sample.jpg",
        brand: "Sample brand name",
        category: "600751249f37c2f1d96268c4",
        countInStock: 0,
        numReviews: 0,
        description: "Sample description",
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        throw new Error("Product not found");
        res.status(404);
    }
});

export {
    getProductList,
    getProductDetails,
    deleteProduct,
    createProduct,
    updateProduct,
};
