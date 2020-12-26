import asyncHandler from "express-async-handler";
import User from "../models/user.js";

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.status(200).json({ token: null });
    } else {
        res.status(401).json("Email or password incorrect");
    }
});

export { authUser };
