const express = require("express");
const { handleCreateBlog, handleAddComments, renderSingleBlog, renderAddBlog } = require("../controllers/blog");
const { checkAuth } = require("../middlewares/authentication");
const path = require("path");
const router = express.Router();
const multer = require("multer");

const coverPicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/blogcover/'))
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + '-' + file.originalname;
        cb(null, fileName)
    }
})
const upload = multer({ storage: coverPicStorage });

router.route("/add")
    .get(renderAddBlog)
    .post(upload.single('coverPic'), handleCreateBlog);

router.get("/:id", checkAuth, renderSingleBlog);
router.post("/comment/:blogId", handleAddComments);

module.exports = router;