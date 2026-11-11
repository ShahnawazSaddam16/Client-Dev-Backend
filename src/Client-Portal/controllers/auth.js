const jwt = require("jsonwebtoken");
const Users = require("../../models/users");

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

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("client_token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

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
    const isProduction = process.env.NODE_ENV === "production";

    res.clearCookie("client_token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
    });
    return res.status(200).json({ success: true, message: "Logged out successfully" });
};

module.exports = { Login, Me, Logout };