require("dotenv").config();
const jwt = require("jsonwebtoken");
const Users = require("../../models/users");

const COOKIE_NAME = process.env.CLIENT_COOKIE_NAME || "client_token";

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.cookies?.[COOKIE_NAME];

        if (!token && req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ success: false, message: "Not authenticated" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await Users.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ success: false, message: "User no longer exists" });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;