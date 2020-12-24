import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import db from "./startup/db.js";
import routes from "./startup/routes.js";

dotenv.config();
/**
 * Calling mongodb connetion
 */
db();
const app = express();
/**
 * Calling app routes
 */
routes(app);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server running on port ${port}`.bgGreen.black));
