import express from "express";
import { authUser } from "../controllers/user.controller.js";

const router = express.Router();

/**
 * @url         /api/user/
 * @access      public
 */

router.post("/login", authUser);

export default router;
