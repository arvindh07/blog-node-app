const Blog = require("../models/blog");
const Comment = require("../models/comment");
const User = require("../models/user");

const renderAddBlog = (req, res, next) => {
    return res.render("AddBlog.ejs");
}

const handleCreateBlog = async (req, res, next) => {
    const {title, content} = req.body;
    const authorId = req.user.id;
    await Blog.create({
        title,
        content,
        createdBy: authorId
    })

    return res.redirect("/");
}

const renderSingleBlog = async (req, res, next) => {
    const {id} = req.params;
    const currentBlog = await Blog.findById(id);
    const comments = await Comment
        .find({ blogId: id, userId: req.user.id })
        .populate("userId")
        .sort({ createdAt: -1 });
    return res.render("Blog.ejs", {currentBlog, comments})
}

const handleAddComments = async (req, res, next) => {
    const {blogId} = req.params;
    const {comment} = req.body;
    // const blog = await Blog.findById(blogId);
    // const user = await User.findById(req.user.id);

    const userComment = {
        comment,
        blogId,
        userId: req.user.id
    }

    await Comment.create(userComment);

    return res.redirect("/blog/" + blogId);
}

module.exports = {
    handleCreateBlog,
    renderSingleBlog,
    handleAddComments,
    renderAddBlog
}