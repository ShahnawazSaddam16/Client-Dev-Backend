require("dotenv").config();
const jwt = require("jsonwebtoken");

const username_code = process.env.ADMIN_USERNAME;
const password_code = process.env.ADMIN_PASSWORD;

const isProduction = process.env.NODE_ENV === "production";
const COOKIE_NAME = process.env.DEV_COOKIE_NAME || "dev_token";
const COOKIE_DOMAIN = isProduction ? process.env.DEV_COOKIE_DOMAIN : undefined;

const getCookieOptions = (req) => {
    const isSecureCookie = isProduction && (req.secure || req.headers["x-forwarded-proto"] === "https");

    return {
        httpOnly: true,
        secure: isSecureCookie,
        sameSite: isSecureCookie ? "none" : "lax",
        path: "/",
        domain: isSecureCookie ? COOKIE_DOMAIN : undefined,
        maxAge: 24 * 60 * 60 * 1000,
    };
};

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

        res.cookie(COOKIE_NAME, token, getCookieOptions(req));

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
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            secure: isProduction && (req.secure || req.headers["x-forwarded-proto"] === "https"),
            sameSite: isProduction && (req.secure || req.headers["x-forwarded-proto"] === "https") ? "none" : "lax",
            path: "/",
            domain: isProduction && (req.secure || req.headers["x-forwarded-proto"] === "https") ? COOKIE_DOMAIN : undefined,
        });
        return res.json({ success: true, message: "Logged out successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { Login, Me, Logout };