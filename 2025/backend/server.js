const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messageRoutes")
const userRoutes = require("./routes/users.js")
dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const allowedOrigins = [
    "http://localhost:3000",
    "https://valentine-notes-website-fe5gs8xv3-omarjallouqs-projects.vercel.app",
    "https://valentine-notes-website.vercel.app" // Add your final production URL
];
// app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true, // Allows cookies & authorization headers
    })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));