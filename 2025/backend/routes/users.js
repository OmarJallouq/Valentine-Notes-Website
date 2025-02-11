const express = require("express");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");


const router = express.Router();

router.get("/", protect, async (req, res) => {
    try {
        const users = await User.find({ isInvisible: false }, "name _id email");

        if (!users || users.length === 0) {
            return res.status(200).json([]);
        }

        res.json(users);
    } catch (error) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err.message })
    }
})


module.exports = router;