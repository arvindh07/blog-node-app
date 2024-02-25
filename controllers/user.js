const bcrypt = require("bcryptjs");
const User = require("../models/user");

const showLoginPage = (req, res) => {
    return res.render("Login.ejs");
}
const handleLogin = async (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            error: "All fields required"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    })
    return res.redirect("/");
}

const handleSignup = (req, res) => {
    return res.json({
        msg: "Signup"
    })
}

module.exports = {
    handleLogin,
    handleSignup,
    showLoginPage
}