require("dotenv").config();
const jwt = require("jsonwebtoken");
const Users = require("../../models/users");

const isProduction = process.env.NODE_ENV === "production";
const COOKIE_NAME = process.env.CLIENT_COOKIE_NAME || "client_token";
const COOKIE_DOMAIN = isProduction ? process.env.CLIENT_COOKIE_DOMAIN : undefined;

const getCookieOptions = (req) => {
    const isSecureCookie = isProduction && (req.secure || req.headers["x-forwarded-proto"] === "https");

    return {
        httpOnly: true,
        secure: isSecureCookie,
        sameSite: isSecureCookie ? "none" : "lax",
        path: "/",
        domain: isSecureCookie ? COOKIE_DOMAIN : undefined,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };
};

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please fill all fields" });
        }

        const user = await Users.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d",
        });

        res.cookie(COOKIE_NAME, token, getCookieOptions(req));

        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                status: user.status,
            },
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message || err });
    }
};

const Me = async (req, res) => {
    return res.status(200).json({ success: true, user: req.user });
};

const Logout = async (req, res) => {
    const isSecureCookie = isProduction && (req.secure || req.headers["x-forwarded-proto"] === "https");

    res.clearCookie(COOKIE_NAME, {
        httpOnly: true,
        secure: isSecureCookie,
        sameSite: isSecureCookie ? "none" : "lax",
        path: "/",
        domain: isSecureCookie ? COOKIE_DOMAIN : undefined,
    });
    return res.status(200).json({ success: true, message: "Logged out successfully" });
};

module.exports = { Login, Me, Logout };