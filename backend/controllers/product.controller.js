import asyncHandler from "express-async-handler";
import Product from "../models/product.js";

const getProductList = asyncHandler(async (req, res) => {
    const pageSize = Number(req.query.pageSize) || 4;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.search
        ? { name: { $regex: req.query.search, $options: "i" } }
        : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
        .sort("-updatedAt")
        .populate("user", "id name")
        .populate("category")
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    if (products) {
        res.json({
            products,
            page,
            pages: Math.ceil(count / pageSize),
        });
    } else {
        res.status(400);
        throw new Error("No products found");
    }
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
        sale,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = name;
        product.description = description;
        product.price = price;
        product.sale = sale;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        );
        if (alreadyReviewed) {
            res.status(400);
            throw new Error("Product already reviewed");
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;
        await product.save();
        res.json({ message: "Review Added" });
        res.status(201);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

const getTopRatedProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    if (products) {
        res.json(products);
    } else {
        res.status(400);
        throw new Error("No products found");
    }
});

const getTopSaleProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ sale: -1 }).limit(3);
    if (products) {
        res.json(products);
    } else {
        res.status(400);
        throw new Error("No products found");
    }
});

export {
    getProductList,
    getProductDetails,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopRatedProducts,
    getTopSaleProducts,
};
