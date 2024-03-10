const jwt = require("jsonwebtoken");

const createToken = (id, name, email, role) => {
    return jwt.sign({
        id,
        name,
        email,
        role
    }, process.env.JWT_SECRET)
}

const verifyToken = (token) => {
    try {
        if(token){
            return jwt.verify(token, process.env.JWT_SECRET);
        } else{
            return res.redirect("/user/login");
        }
    } catch (error) {
        console.log("err", error);
        return res.redirect("/user/login");
    }
}

module.exports = {
    createToken,
    verifyToken
}