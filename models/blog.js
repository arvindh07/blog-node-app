const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment: {
        type: String
    },
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId
    }
}, { timestamps: true })

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
    //     default: "/blogcover/default.jpg"
    // },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    comments: {
        type: [commentSchema]
    }
}, { timestamps: true })

module.exports = mongoose.model("Blog", blogSchema);