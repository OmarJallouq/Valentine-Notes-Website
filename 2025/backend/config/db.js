const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DB_URI);
        console.log(`MongoDB Connected ${connection.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // Stops the server if connection fails
    }
};

module.exports = connectDB;
