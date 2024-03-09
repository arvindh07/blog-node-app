const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: "/profilePics/default.jpg"
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    }
    // need to add user
}, { timestamps: true })

module.exports = mongoose.model("User", userSchema);