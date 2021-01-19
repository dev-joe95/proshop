import express from "express";
import {
    getCategoryList,
    getCategoryDetails,
    deleteCategory,
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

export default router;
