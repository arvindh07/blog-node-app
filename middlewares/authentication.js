const checkForAuth = () => {
    return (req, res, next) => {
        console.log("auth running...",req.url, req.cookies);
        // req.user = null;
        // if(!req.cookies["auth_token"]){
        //     return next();
        // }
        // const user = req.cookies["auth_token"];
        // req.user = user;
        return next();
    }
}

module.exports = {
    checkForAuth
}