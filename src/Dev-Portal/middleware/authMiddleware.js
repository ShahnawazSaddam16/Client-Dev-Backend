require("dotenv").config();
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        let token = req.cookies?.token;

        if (!token && req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token && req.headers["x-auth-token"]) {
            token = req.headers["x-auth-token"];
        }

        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.DEV_JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;