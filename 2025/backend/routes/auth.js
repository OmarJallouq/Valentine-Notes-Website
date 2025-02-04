const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendVerificationEmail = require("../utils/sendEmail");

const router = express.Router();

// SIGN UP (Step 1: Request email verifivation)
router.post("/request-verification", async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });
        console.log(user)

        if (!user) return res.status(400).json({ message: "Email not found" });
        if (user.hasAccount) return res.status(400).json({ message: "Account already exists with this email!" });

        // Generate one-time verification token
        const verificationToken = jwt.sign({ email }, `${process.env.EMAIL_SECRET}`, { expiresIn: "15m" });

        // Send email 
        await sendVerificationEmail(email, verificationToken);

        return res.json({ message: "Verification email sent!" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error!" });
    }
})

// SIGN UP (Step 2: Create account after verification)
router.post("/signup", async (req, res) => {
    try {
        const { token, password } = req.body;

        // Verify token 
        const { email } = jwt.verify(token, process.env.EMAIL_SECRET);
        const user = await User.findOne({ email });

        if (!user || user.hasAccount) return res.status(400).json({ message: "Invalid request!" });

        // Has password and update user
        user.password = await bcrypt.hash(password, 10);
        user.hasAccount = true;
        await user.save();

        return res.json({ message: "Account created!" });
    } catch (err) {
        return res.status(400).json({ message: "Invalid or expried token!" });
    }
})

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !user.hasAccount) return res.status(400).json({ message: "Invalid credentials!" });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect password!" });

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({ token });
    } catch (err) {
        return res.status(500).json({ message: "Server error!" });
    }
})

module.exports = router;