const express = require("express");
const { handleCreateBlog, handleAddComments, renderSingleBlog, renderAddBlog } = require("../controllers/blog");
const { checkAuth } = require("../middlewares/authentication");
const router = express.Router();

router.route("/add")
    .get(renderAddBlog)
    .post(handleCreateBlog);

router.get("/:id", checkAuth, renderSingleBlog);
router.post("/comment/:blogId", handleAddComments);

module.exports = router;