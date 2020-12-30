import express from "express";
import protect from "../middleware/auth.js";
import { addOrderItems } from "../controllers/product.controller.js";

const router = express.Router();

/**
 * @description Add order items route
 * @method      POST
 * @url         /api/order/
 * @access      private
 */
router.post("/", protect, addOrderItems);

export default router;
