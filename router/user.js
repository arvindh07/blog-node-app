const express = require("express");
const { handleLogin, handleSignup } = require("../controllers/user");
const router = express.Router();

router.post("/login", handleLogin);
router.post("/signup", handleSignup);

module.exports = router;