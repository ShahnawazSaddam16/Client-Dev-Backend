const Messages = require("../../models/messages");
const Users = require("../../models/users");

const sentMessage = async (req, res) => {
    try {
        const { email, message } = req.body;

        if (!email || !message) {
            return res.status(400).json({ success: false, message: "Please fill all fields" });
        }

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        const newMessage = await Messages.create({
            userId: user._id,
            email,
            message,
        });

        const io = req.app.get("io");
        if (io) {
            io.to(`user:${user._id}`).emit("notification:new", newMessage);
        }

        return res.status(201).json({ success: true, message: "Message Sent Successfully", data: newMessage });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message || err });
    }
};

module.exports = { sentMessage };