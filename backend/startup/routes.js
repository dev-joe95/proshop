import express from "express";
import categoryRouter from "../routes/category.routes.js";
import productRouter from "../routes/product.routes.js";
import userRouter from "../routes/user.routes.js";
import orderRouter from "../routes/order.routes.js";
import uploadRouter from "../routes/upload.routes";
import notFound from "../middleware/notFound.js";
import error from "../middleware/error.js";
export default function (app) {
    app.use(express.json());
    app.use("/api/category", categoryRouter);
    app.use("/api/user", userRouter);
    app.use("/api/product", productRouter);
    app.use("/api/order", orderRouter);
    app.get("/api/config/paypal", (req, res) => {
        res.send(process.env.PAYPAL_CLIENT_ID);
    });
    app.use("/api/upload", uploadRouter);
    /**
     ** Creating  custom error handler
     */
    app.use(notFound);
    app.use(error);
}
