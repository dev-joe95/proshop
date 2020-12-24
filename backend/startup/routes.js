import express from "express";
import categoryRouter from "../routes/category.routes.js";
import productRouter from "../routes/product.routes.js";
import notFound from "../middleware/notFound.js";
import error from "../middleware/error.js";
export default function (app) {
    app.use(express.json());
    app.use("/api/category", categoryRouter);
    app.use("/api/product", productRouter);
    /**
     ** Creating  custom error handler
     */
    app.use(notFound);
    app.use(error);
}
