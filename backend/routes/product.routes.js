import express from "express";
import {
    getProductList,
    getProductDetails,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopRatedProducts,
    getTopSaleProducts,
} from "../controllers/product.controller.js";
import { admin, protect } from "../middleware/auth.js";

const router = express.Router();

/**
 * @description Get product for admin
 * @method      GET
 * @url         /api/product/
 * @access      private/Admin
 */
router.get("/", getProductList);
/**
 * @description Get top rated product
 * @method      GET
 * @url         /api/product/top
 * @access      public
 */
router.get("/top", getTopRatedProducts);
/**
 * @description Get top sale product
 * @method      GET
 * @url         /api/product/sale
 * @access      public
 */
router.get("/sale", getTopSaleProducts);
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
/**
 * @description Create products by admin
 * @method      POST
 * @url         /api/product/
 * @access      private/Admin
 */
router.post("/", protect, admin, createProduct);
/**
 * @description Update products by admin
 * @method      PUT
 * @url         /api/product/<id>
 * @access      private/Admin
 */
router.put("/:id", protect, admin, updateProduct);
/**
 * @description Create product review
 * @method      POST
 * @url         /api/product/<id>/review
 * @access      private
 */
router.post("/:id/review", protect, createProductReview);
export default router;
