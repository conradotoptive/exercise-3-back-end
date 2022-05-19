const { response, request } = require("express");
const { verifyToken } = require("../utils/handleJwt");
const User = require('../db/userSchema');

const authMiddleware = async (request, response, next) => {
    try {
        if (!request.headers.authorization){
            response.status(401);
            return
        }

        const token = request.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);

        if(!dataToken._id){
            response.status(401);
            return
        }

        const user = await User.findById(dataToken._id);
        request.user = user;

        next();

    } catch (err){
        console.log(err),
        response.status(401).end();
    }
}

module.exports = authMiddleware;