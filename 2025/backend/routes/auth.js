const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

//const sendVerificationEmail = require("../utils/sendEmail");

const router = express.Router();

// SIGN UP (Step 1: Request email verifivation)
// router.post("/request-verification", async (req, res) => {
//     try {
//         const { email } = req.body;
//         const user = await User.findOne({ email: email });
//         console.log(user)

//         if (!user) return res.status(400).json({ message: "Email not found" });
//         if (user.hasAccount) return res.status(400).json({ message: "Account already exists with this email!" });

//         // Generate one-time verification token
//         const verificationToken = jwt.sign({ email }, `${process.env.EMAIL_SECRET}`, { expiresIn: "15m" });

//         // Send email 
//         await sendVerificationEmail(email, verificationToken);

//         return res.json({ message: "Verification email sent!" });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Server error!" });
//     }
// })

// SIGN UP (Step 2: Create account after verification)
router.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "Email invalid (Please use your bocconi email!)" });
        if (user.hasAccount) return res.status(400).json({ message: "Account already exists!" });

        // Hash password and update user
        user.password = await bcrypt.hash(password, 10);
        user.hasAccount = true;
        await user.save();

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        return res.json({ message: "Account created!", token });
    } catch (err) {
        return res.status(400).json({ message: "Server error!" });
    }
})

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "Email not found! (Please use your bocconi email!)" });

        if (!password) {
            return res.json({ hasAccount: user.hasAccount, valid: true });
        }

        if (!user.hasAccount) return res.status(400).json({ message: "Account not set up!", hasAccount: false });

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

router.get("/users", protect, async (req, res) => {
    try {
        const users = await User.find({}, "name _id email");

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