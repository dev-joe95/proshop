import express from "express";
import {
    getProductList,
    getProductDetails,
} from "../controllers/product.controller.js";

const router = express.Router();

/**
 * @url         /api/product/
 * @access      public
 */

router.get("/", getProductList);
router.get("/:id", getProductDetails);

export default router;
