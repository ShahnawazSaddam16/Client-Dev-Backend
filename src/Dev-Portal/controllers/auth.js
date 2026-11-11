require("dotenv").config();
const jwt = require("jsonwebtoken");

const username_code = process.env.ADMIN_USERNAME;
const password_code = process.env.ADMIN_PASSWORD;


const Login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(401).json({ success: false, message: "Please fill all fields" });
        }

        if (username !== username_code || password !== password_code) {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }

        const token = jwt.sign(
            { username },
            process.env.DEV_JWT_SECRET,
            { expiresIn: "1d" }
        );

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("dev_token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            path: "/",
            ...(isProduction ? { domain: "dev-portal.buttnetworks.com" } : {}),
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.json({ success: true, message: "Logged in successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

const Me = async (req, res) => {
    try {
        return res.json({ success: true, user: req.user, name: "Shahnawaz Saddam Butt" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

const Logout = async (req, res) => {
    try {
        const isProduction = process.env.NODE_ENV === "production";

        res.clearCookie("dev_token", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            path: "/",
            ...(isProduction ? { domain: "dev-portal.buttnetworks.com" } : {}),
        });
        return res.json({ success: true, message: "Logged out successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { Login, Me, Logout };