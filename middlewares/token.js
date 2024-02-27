const jwt = require("jsonwebtoken");

const createToken = (id, email, role) => {
    return jwt.sign({
        id,
        email,
        role
    }, process.env.JWT_SECRET)
}

module.exports = {
    createToken
}