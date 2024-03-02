const express = require("express");
const { handleLogin, handleSignup, renderLoginPage, renderSignupPage } = require("../controllers/user");
const router = express.Router();
// const upload = require("../multer");

router.route("/login")
    .get(renderLoginPage)
    .post(handleLogin);

router.route("/signup")
    .get(renderSignupPage)
    .post(handleSignup);

module.exports = router;