const express = require("express");
const router = express.Router();
const { sendMessage, getMessages } = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

// Send a message
router.post("/send", protect, sendMessage);

// Get all received messages
router.get("/inbox", protect, getMessages);

module.exports = router;