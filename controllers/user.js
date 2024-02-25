const handleLogin = (req, res) => {
    return res.json({
        msg: "Login"
    })
}

const handleSignup = (req, res) => {
    return res.json({
        msg: "Signup"
    })
}

module.exports = {
    handleLogin,
    handleSignup
}