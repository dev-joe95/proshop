import express from "express";
import {
    getCategoryList,
    getCategoryDetails,
} from "../controllers/category.controller.js";

const router = express.Router();

/**
 * @url         /api/category/
 * @access      public
 */

router.get("/", getCategoryList);
router.get("/:id", getCategoryDetails);

export default router;
