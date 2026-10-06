const Users = require("../../models/users");

const addUser = async (req, res) => {
    try {
        const { username, email, password, status = "Active" } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ success: false, message: "Please fill all fields" });
        }

        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists" });
        }

        const newUser = await Users.create({
            username,
            email,
            password,
            status,
        });

        return res.status(201).json({ success: true, message: "User Created Successfully", user: newUser });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message || err });
    }
};

const allUsers = async (req, res) => {
    try {
        const users = await Users.find();
        const totalUsers = await Users.countDocuments();

        return res.status(200).json({ success: true, users, totalUsers });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message || err });
    }
};

const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password, status } = req.body;

        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        if (username !== undefined) user.username = username;
        if (email !== undefined) user.email = email;
        if (password !== undefined) user.password = password;
        if (status !== undefined) user.status = status;

        await user.save();
        return res.status(200).json({ success: true, message: "User Updated Successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message || err });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await Users.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        return res.status(200).json({ success: true, message: "User Deleted Successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message || err });
    }
};

module.exports = { addUser, allUsers, editUser, deleteUser };