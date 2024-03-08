const jwt = require("jsonwebtoken");

const createToken = (id, email, role) => {
    return jwt.sign({
        id,
        email,
        role
    }, process.env.JWT_SECRET)
}

const verifyTokenAndCheckAuth = (req, res, next) => {
    try {
        const user = jwt.verify(req.cookie["auth_token"], process.env.JWT_SECRET);
        if(user){
            req.user = user;
            return next();
        }
        return res.redirect("/user/login");
    } catch (error) {
        return res.redirect("/user/login");
    }
}

module.exports = {
    createToken,
    verifyTokenAndCheckAuth
}