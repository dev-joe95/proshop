import express from "express";
import { getAll, getById } from "../controllers/product.controller.js";

const router = express.Router();

/**
 * @url         /api/product/
 * @access      public
 */

router.get("/", getAll);
router.get("/:id", getById);


export default router;
