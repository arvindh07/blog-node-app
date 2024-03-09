const express = require("express");
const { handleCreateBlog, renderSingleBlog, renderAddBlog } = require("../controllers/blog");
// const { verifyToken } = require("../middlewares/token");
const router = express.Router();

router.route("/add")
    .get(renderAddBlog)
    .post( handleCreateBlog);

router.get("/:id", renderSingleBlog);

module.exports = router;