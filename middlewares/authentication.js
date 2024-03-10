const { verifyToken } = require("./token");

// for each and every request that is incoming, below function will run
const checkAndVerifyToken = (req, res, next) => {
    return (req, res, next) => {
        try {
            req.user = null;
            const token = req.cookies["auth_token"];
            if(token){
                req.user = verifyToken(token);
            }
            return next();
        } catch (error) {
            console.log("token error ", error);
            return next();
        }
    }
}

const checkAuth = (req, res, next) => {
    try {
        if(req.user){
            return next();
        }
        return res.redirect("/user/login");
    } catch (error) {
        console.log("login error ", error);
        return res.redirect("/user/login");
    }
}

module.exports = {
    checkAndVerifyToken,
    checkAuth
}