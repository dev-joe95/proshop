import express from "express";
import colors from "colors";
import path from "path";
import dotenv from "dotenv";
import db from "./startup/db.js";
import routes from "./startup/routes.js";
import morgan from "morgan";

dotenv.config();
/**
 * Calling mongodb connection
 */
db();
const app = express();
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
/**
 * Calling app routes
 */
routes(app);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server running on port ${port}`.bgGreen.black));
