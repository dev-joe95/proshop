import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";

const protect = asyncHandler(async (req, res, next) => {
    const headerAuthorization = req.headers.authorization;
    let token;
    if (headerAuthorization && headerAuthorization.startsWith("Bearer")) {
        try {
            token = headerAuthorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = await User.findById(decoded._id).select("-password");
            next();
        } catch (err) {
            res.status(401);
            throw new Error("Not authorized, no token found");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token found");
    }
});

export default protect;
