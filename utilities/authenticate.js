//Requests with this function will return with a 401 error if a session isn't found. 
//Don't include this in your routes if you're not ready to test validation, or your config files aren't quite working. 
const isAuthenticated = (req, res, next) => {
    if (req.session.user === undefined){
        return res.status(401).json("You do not have access.")
    }
    next();
};

module.exports = {
    isAuthenticated
}
