const jwt = require("jsonwebtoken");
const secretKey = "vijay@123";
function getUser(token){
    try{
        return jwt.verify(token , secretKey);
    }
    catch(err){
        return null;
    }
}

function setUser(user) {
    return jwt.sign(
        {
            _id : user._id,
            email : user.email,
            role: user.role,
        },
        secretKey
    );
}

module.exports = {
    setUser,
    getUser,
};