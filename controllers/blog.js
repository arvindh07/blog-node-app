const handleCreateBlog = () => {
    return res.status(200).json({
        msg: "create blog"
    })
}

module.exports = {
    handleCreateBlog
}