const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    pan: {
        type: String,
        required: false,
    },
    profileImage: {
        type: String,
        required: false,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    startTimestamp: {
        type: Date,
    },
});

// Create and export the User model
const User = mongoose.model("User", userSchema);
module.exports = User;
