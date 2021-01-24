import express from "express";
import categoryRouter from "../routes/category.routes.js";
import productRouter from "../routes/product.routes.js";
import userRouter from "../routes/user.routes.js";
import orderRouter from "../routes/order.routes.js";
import uploadRouter from "../routes/upload.routes.js";
import notFound from "../middleware/notFound.js";
import error from "../middleware/error.js";
import path from "path";
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
    const __dirname = path.resolve();
    app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

    if (process.env.NODE_ENV === "production") {
        app.use(express.static(path.join(__dirname, "/frontend/build")));

        app.get("*", (req, res) =>
            res.sendFile(
                path.resolve(__dirname, "frontend", "build", "index.html")
            )
        );
    } else {
        app.get("/", (req, res) => {
            res.send("API is running....");
        });
    }
    app.use(notFound);
    app.use(error);
}
