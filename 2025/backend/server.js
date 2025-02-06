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
app.use(express.json());
app.use(cors())
// app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));