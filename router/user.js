const express = require("express");
const { handleLogin, handleSignup, showLoginPage } = require("../controllers/user");
const router = express.Router();

router.route("/login")
    .get(showLoginPage)
    .post(handleLogin);
router.post("/signup", handleSignup);

module.exports = router;