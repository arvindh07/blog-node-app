const express = require("express");
const { handleCreateBlog } = require("../controllers/blog");
const router = express.Router();

router.post("/add", handleCreateBlog);

module.exports = router;