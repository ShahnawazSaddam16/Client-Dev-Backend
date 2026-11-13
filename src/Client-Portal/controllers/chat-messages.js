const Messages = require("../../models/chat-messages");

const sentMessage = async (req, res) => {
    try {
        const userId = req.user._id;

        const { message } = req.body;

        if (!message) {
            return res.status(401).json({ success: false, message: "Please fill all fields" });
        }

        if (message.trim().length >= 2000) {
            return res.status(401).json({ success: false, message: "Characters Exceeded" });
        }

        const newMessage = await Messages.create({
            userId,
            username: req.user.username,
            email: req.user.email,
            message: message.trim(),
        });

        return res.status(201).json({ success: true, message: "Message sent",});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message || err });
    }
};

module.exports = { sentMessage };