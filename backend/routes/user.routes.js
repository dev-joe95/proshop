import express from "express";
import { authUser, getUserProfile } from "../controllers/user.controller.js";
import protect from "../middleware/auth.js";

const router = express.Router();

/**
 * @url         /api/user/login
 * @access      public
 */

router.post("/login", authUser);
/**
 * @url         /api/user/me
 * @access      private
 */
router.get("/me", protect, getUserProfile);

export default router;
