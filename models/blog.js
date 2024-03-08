const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    // coverPic: {
    //     type: String,
    //     required: true,
    //     default: "/"
    // },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Blog", blogSchema);