const Blog = require("../models/blog");

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

module.exports = {
    handleCreateBlog,
    renderSingleBlog,
    renderAddBlog
}