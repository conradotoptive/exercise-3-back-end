const jsonwebtoken = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const tokenSign = async (user) => {
    const sign = jsonwebtoken.sign(
        {
            _id: user._id,
            role: user.isAdmin
        },
        JWT_SECRET,
        {
            expiresIn: '3h',
        }
        );
    return sign
};

const verifyToken = async (tokenJwt) => {
    try{
        return jsonwebtoken.verify(tokenJwt, JWT_SECRET)
    }catch(err){
        console.log(err);
        return null
    }
};

module.exports = { tokenSign, verifyToken }