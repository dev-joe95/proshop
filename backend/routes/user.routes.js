import express from "express";
import {
    authUser,
    deleteUser,
    getUserProfile,
    getUsers,
    registerUser,
    updateUserProfile,
} from "../controllers/user.controller.js";
import { admin, protect } from "../middleware/auth.js";

const router = express.Router();
/**
 * @method      POST
 * @url         /api/user/login
 * @description User authentication route
 * @access      public
 */
router.post("/login", authUser);
/**
 * @description User profile route
 * @method      GET
 * @url         /api/user/profile
 * @access      private
 */
router.get("/profile", protect, getUserProfile);
/**
 * @description Update User profile route
 * @method      PUT
 * @url         /api/user/profile
 * @access      private
 */
router.put("/profile", protect, updateUserProfile);
/**
 * @description User registration route
 * @method      POST
 * @url         /api/user/
 * @access      public
 */
router.post("/", registerUser);
/**
 * @description Get users for admin
 * @method      GET
 * @url         /api/user/
 * @access      private/Admin
 */
router.get("/", protect, admin, getUsers);
/**
 * @description Delete users for admin
 * @method      DELETE
 * @url         /api/user/<id>
 * @access      private/Admin
 */
router.delete("/:id", protect, admin, deleteUser);
export default router;
