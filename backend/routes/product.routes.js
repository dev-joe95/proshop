import express from "express";
import {
    getProductList,
    getProductDetails,
    deleteProduct,
} from "../controllers/product.controller.js";
import { admin, protect } from "../middleware/auth.js";

const router = express.Router();

/**
 * @url         /api/product/
 * @access      public
 */
/**
 * @description Get product for admin
 * @method      GET
 * @url         /api/product/
 * @access      private/Admin
 */
router.get("/", getProductList);
/**
 * @description GET user by id for admin
 * @method      GET
 * @url         /api/product/<id>
 * @access      private/Admin
 */
router.get("/:id", getProductDetails);
/**
 * @description Delete products for admin
 * @method      DELETE
 * @url         /api/product/<id>
 * @access      private/Admin
 */
router.delete("/:id", protect, admin, deleteProduct);
export default router;
