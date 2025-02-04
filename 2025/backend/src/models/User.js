const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, //will be empty initially
    hasAccount: { type: Boolean, default: false }
})

module.exports = mongoose.model("User", UserSchema);