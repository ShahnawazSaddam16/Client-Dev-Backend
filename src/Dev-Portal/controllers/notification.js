const Notifications = require("../../models/notification");
const Users = require("../../models/users");

const sentNotification = async (req, res) => {
    try {
        const { email, message } = req.body;

        if (!email || !message) {
            return res.status(400).json({ success: false, message: "Please fill all fields" });
        }

        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        const newMessage = await Notifications.create({
            userId: user._id,
            email,
            message,
        });

        return res.status(201).json({ success: true, message: "Message Sent Successfully", data: newMessage });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: err.message || err });
    }
};

module.exports = { sentNotification };