const jwt = require("jsonwebtoken");

const createToken = (id, email, role) => {
    return jwt.sign({
        id,
        email,
        role
    }, process.env.JWT_SECRET)
}

const verifyToken = () => {
    return jwt.verify("", process.env.JWT_SECRET);
}

module.exports = {
    createToken,
    verifyToken
}