import express from "express";
import protect from "../middleware/auth.js";
import {
    addOrderItems,
    getOrderDetails,
    updateOrderToPaid,
} from "../controllers/order.controller.js";

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
router.get("/:id", protect, getOrderDetails);

/**
 * @description Update order to paid
 * @method      PUT
 * @url         /api/order/<id>/pay
 * @access      private
 */
router.put("/:id/pay", protect, updateOrderToPaid);

export default router;