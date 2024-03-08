const express = require("express");
const { handleCreateBlog, renderAddBlog } = require("../controllers/blog");
const router = express.Router();

router.route("/add")
    .get(renderAddBlog)
    .post(handleCreateBlog);

module.exports = router;