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
    return jwt.verify(token, process.env.JWT_SECRET);
        // if(user){
        //     req.user = user;
        //     return next();
        // }
        // return res.redirect("/user/login");
    // } catch (error) {
    //     console.log("err", error);
    //     return res.redirect("/user/login");
    // }
}

module.exports = {
    createToken,
    verifyToken
}