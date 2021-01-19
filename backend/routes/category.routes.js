import express from "express";
import {
    getCategoryList,
    getCategoryDetails,
    deleteCategory,
    createCategory,
    updateCategory,
} from "../controllers/category.controller.js";
import { admin, protect } from "../middleware/auth.js";

const router = express.Router();
/**
 * @description Get categories for admin
 * @method      GET
 * @url         /api/category/
 * @access      public
 */
router.get("/", getCategoryList);
/**
 * @description GET category by id for admin
 * @method      GET
 * @url         /api/category/<id>
 * @access      public
 */
router.get("/:id", getCategoryDetails);
/**
 * @description Delete categories for admin
 * @method      DELETE
 * @url         /api/category/<id>
 * @access      private/Admin
 */
router.delete("/:id", protect, admin, deleteCategory);
/**
 * @description Create categories by admin
 * @method      POST
 * @url         /api/category/
 * @access      private/Admin
 */
router.post("/", protect, admin, createCategory);
/**
 * @description Update categories by admin
 * @method      PUT
 * @url         /api/category/<id>
 * @access      private/Admin
 */
router.put("/:id", protect, admin, updateCategory);
export default router;
