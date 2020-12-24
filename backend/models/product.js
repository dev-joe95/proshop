import mongoose from "mongoose";
import { reviewSchema } from './review.js';

const productSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Category",
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: Text,
            required: true,
            unique: true,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        sale: {
            type: Number,
            required: true,
            default: 0,
        },
        image: {
            type: String,
            required: true,
            default: false,
        },
        brand: {
            type: Text,
            required: true,
        },
        reviews: [reviewSchema],
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
