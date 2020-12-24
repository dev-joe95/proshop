import express from "express";
import { getAll, getById } from "../controllers/category.controller.js";

const router = express.Router();

/**
 * @url         /api/category/
 * @access      public
 */

router.get("/", getAll);
router.get("/:id", getById);

export default router;
