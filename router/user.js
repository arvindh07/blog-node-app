const express = require("express");
const { handleLogin, handleSignup, renderLoginPage, renderSignupPage } = require("../controllers/user");
const router = express.Router();

router.route("/login")
    .get(renderLoginPage)
    .post(handleLogin);
router.route("/signup")
    .get(renderSignupPage)
    .post(handleSignup);

module.exports = router;