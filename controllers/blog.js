const Blog = require("../models/blog");

const renderAddBlog = (req, res, next) => {
    return res.render("AddBlog.ejs");
}

const handleCreateBlog = async (req, res, next) => {
    const {title, content} = req.body;
    const authorId = req.user._id;
    await Blog.create({
        title,
        content,
        createdBy: authorId
    })
    
    return res.status(200).json({
        msg: "Blog created successfully"
    })
}

module.exports = {
    handleCreateBlog,
    renderAddBlog
}