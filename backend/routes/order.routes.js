import express from "express";
import protect from "../middleware/auth.js";
import { addOrderItems } from "../controllers/order.controller.js";

const router = express.Router();

/**
 * @description Add order items route
 * @method      POST
 * @url         /api/order/
 * @access      private
 */
router.post("/", protect, addOrderItems);

/**
 * @description Gey order by id
 * @method      GET
 * @url         /api/order/<id>
 * @access      private
 */
router.post("/:id", protect, addOrderItems);

export default router;
