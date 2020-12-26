import express from "express";
import {
    authUser,
    getUserProfile,
    registerUser,
} from "../controllers/user.controller.js";
import protect from "../middleware/auth.js";

const router = express.Router();

/**
 * @description User authentication route
 * @method      POST
 * @url         /api/user/login
 * @access      public
 */

router.post("/login", authUser);
/**
 * @description User profile route
 * @method      GET
 * @url         /api/user/me
 * @access      private
 */
router.get("/me", protect, getUserProfile);
/**
 * @description User registration route
 * @method      POST
 * @url         /api/user/
 * @access      public
 */
router.post("/", registerUser);

export default router;
