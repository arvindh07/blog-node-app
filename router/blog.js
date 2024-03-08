const express = require("express");
const { handleCreateBlog, renderAddBlog } = require("../controllers/blog");
const { verifyTokenAndCheckAuth } = require("../middlewares/token");
const router = express.Router();

router.route("/add")
    .get(renderAddBlog)
    .post(verifyTokenAndCheckAuth, handleCreateBlog);

module.exports = router;