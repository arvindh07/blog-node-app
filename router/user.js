const express = require("express");
const { handleLogin, handleSignup, handleLogout, renderLoginPage, renderSignupPage } = require("../controllers/user");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve("./public/profilePics"))
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + '-' + file.originalname;
        cb(null, fileName)
    }
})
const upload = multer({ storage: storage })

router.route("/login")
    .get(renderLoginPage)
    .post(handleLogin);

router.route("/signup")
    .get(renderSignupPage)
    .post(upload.single("profilePic") , handleSignup);

router.get("/logout", handleLogout);

module.exports = router;