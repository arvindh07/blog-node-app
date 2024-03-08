const renderAddBlog = (req, res, next) => {
    return res.render("AddBlog.ejs");
}

const handleCreateBlog = () => {
    return res.status(200).json({
        msg: "create blog"
    })
}

module.exports = {
    handleCreateBlog,
    renderAddBlog
}