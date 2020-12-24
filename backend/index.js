import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import db from "./startup/db.js";

dotenv.config();

// Calling mongodb connetion
db();

 const app = express();

app.get("/", (req, res) => {
    res.send("Hello from Proshop application");
});

app.get("/api/product", (req, res) => {
    res.json(products);
});

app.get("/api/product/:id", (req, res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.json(product);
});

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server running on port ${port}`));
