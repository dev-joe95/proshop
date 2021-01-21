import express from "express";
import { admin, protect } from "../middleware/auth.js";
import {
    addOrderItems,
    getMyOrders,
    getOrderDetails,
    getOrders,
    updateOrderToDelivered,
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

/**
 * @description Get order for admin
 * @method      GET
 * @url         /api/order
 * @access      private/Admin
 */
router.get("/", protect, admin, getOrders);

/**
 * @description Update order to deliver
 * @method      PUT
 * @url         /api/order/<id>/deliver
 * @access      private/Admin
 */
router.put("/:id/deliver", protect, admin, updateOrderToDelivered);

export default router;
