const Message = require("../models/Message");
const User = require("../models/User");

// @desc    Send a message
// @route   POST /api/messages/send
// @access  Private
const sendMessage = async (req, res) => {
    try {
        const { receiverId, content, anonymous } = req.body;
        const sender = await User.findById(req.user._id);

        if (!receiverId || !content) {
            return res.status(400).json({ message: "Receiver and messages content required." })
        }

        const message = await Message.create({
            senderId: req.user._id, //logged in User
            receiverId,
            senderName: (sender.isInvisible || anonymous) ? "Anonymous" : req.user.name,
            content,
            anonymous: sender.isInvisible ? true : anonymous,
        });

        console.log(message)

        res.status(201).json({ message: "Message send!", data: message });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// @desc    Get all received messages for a user
// @route   GET /api/messages/inbox
// @access  Private
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({ receiverId: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = { sendMessage, getMessages };
