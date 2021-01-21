import express from "express";
import colors from "colors";
import path from "path";
import dotenv from "dotenv";
import db from "./startup/db.js";
import routes from "./startup/routes.js";

dotenv.config();
/**
 * Calling mongodb connection
 */
db();
const app = express();
/**
 * Calling app routes
 */
routes(app);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.get("/", (req, res) => {
    res.send("API is running");
});

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server running on port ${port}`.bgGreen.black));
