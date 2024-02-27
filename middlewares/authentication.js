// for each and every request that is incoming, below function will run
const checkForAuth = () => {
    return (req, res, next) => {
        console.log("auth running...",req.url);
        req.user = null;
        if(!req.cookies["auth_token"]){
            return next();
        }
        const user = req.cookies["auth_token"];
        req.user = user;
        return next();
    }
}

module.exports = {
    checkForAuth
}