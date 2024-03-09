const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { createToken } = require("../middlewares/token");

const renderLoginPage = (req, res) => {
    return res.render("Login.ejs");
}

const renderSignupPage = (req, res) => {
    return res.render("Signup.ejs");
}

const handleLogin = async (req, res) => {
    const { email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            error: "All fields required"
        })
    }
    const user = await User.findOne({ email });
    if(!user){
        return res.status(400).json({
            error: "Email doesnt exists"
        })
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if(!matchPassword){
        return res.status(400).json({
            error: "Password doesnt match"
        })
    }
    const token = createToken(user._id.toString(), user.name, user.email, user.password);
    res.cookie("auth_token", token);
    return res.redirect("/");
}

const handleSignup = async (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            error: "All fields required"
        })
    }
    const user = await User.findOne({ email });
    if(user){
        return res.status(400).json({
            error: "Email already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    })
    const token = createToken(newUser._id.toString(), newUser.name, newUser.email, newUser.password);
    res.cookie("auth_token", token);
    return res.redirect("/");
}

const handleLogout = async (req, res) => {
    res.clearCookie("auth_token");
    return res.redirect("/user/login");
}

module.exports = {
    handleLogin,
    handleSignup,
    handleLogout,
    renderLoginPage,
    renderSignupPage
}