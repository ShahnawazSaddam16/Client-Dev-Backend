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

        return res.status(200).json({
            success: true,
            message: "Login Successful",
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

module.exports = { Login };