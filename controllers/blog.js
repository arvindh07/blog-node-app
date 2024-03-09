const Blog = require("../models/blog");
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
    return res.render("Blog.ejs", {currentBlog})
}

const handleAddComments = async (req, res, next) => {
    console.log("req ", req.user);
    const {blogId} = req.params;
    const {comment} = req.body;
    const blog = await Blog.findById(blogId);
    const user = await User.findById(req.user.id);

    const userComment = {
        comment,
        commentedBy: req.user.id
    }

    blog.comments.push(userComment);
    await blog.save();

    return res.redirect("/blog/" + blogId);
}

module.exports = {
    handleCreateBlog,
    renderSingleBlog,
    handleAddComments,
    renderAddBlog
}