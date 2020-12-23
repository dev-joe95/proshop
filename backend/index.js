const express = require("express");
const app = express();
const products = require("./data/products");

app.get("/", (req, res) => {
    res.send("Hello from Proshop application");
});

app.get("/product", (req, res) => {
    res.json(products);
});

app.get("/product/:id", (req, res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.json(product);
});

const port = process.env.PORT || 5000;
app.listen(port, console.log("Server running on port 5000"));
