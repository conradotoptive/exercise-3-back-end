const { response, request  } = require("express");

const checkRol = (rol) => (request, response, next) =>{
    try {

        const { user } = request.user;
        const isAdmin = user.isAdmin;
        const checkValueRol = rol[0] === "admin";
        if (isAdmin != checkValueRol) {
            response.status(403);
            return
        }

        next()

    } catch (err) {
        console.log(err);
        response.status(403).end();
    }  
}

module.exports = checkRol;