import express from "express";
import {protect} from "../middleware/auth.js";
import {
    addOrderItems,
    getMyOrders,
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
 * @description Update order to paid
 * @method      PUT
 * @url         /api/order/<id>/pay
 * @access      private
 */
router.put("/:id/pay", protect, updateOrderToPaid);

/**
 * @description Get order for specific user
 * @method      GET
 * @url         /api/myorders
 * @access      private
 */
router.get("/myorders", protect, getMyOrders);

/**
 * @description Get order by id
 * @method      GET
 * @url         /api/order/<id>
 * @access      private
 */
router.get("/:id", protect, getOrderDetails);

export default router;
