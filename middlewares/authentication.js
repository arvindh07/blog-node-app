const { verifyToken } = require("./token");

// for each and every request that is incoming, below function will run
const checkForAuthToken = () => {
    return (req, res, next) => {
        req.user = null;
        if(!req.cookies["auth_token"]){
            return next();
        }
        const user = verifyToken(req.cookies["auth_token"]);
        req.user = user;
        return next();
    }
}

module.exports = {
    checkForAuthToken
}