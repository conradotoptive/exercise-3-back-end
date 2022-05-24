const { response, request } = require("express");
const  User  = require ('../db/userSchema');
const { encrypt, compare } = require('../utils/handlePassword');
const { tokenSign } = require('../utils/handleJwt');


const registerCtrl = async (request, response) =>{
    try {
        request = request.body;
        mail = request.mail;
        const user = await User.findOne({mail:mail});
        if (user) {
            //response.status(405).end()
            const duplicated = "duplicated";
            response.json(duplicated);
            return
        }
        const password = await encrypt(request.password);
        const isAdmin = false;
        const wallet = 1000;
        const body = {...request, password, isAdmin, wallet};
        const dataUser = await User.create(body);
        const data = {
            token: await tokenSign(dataUser),
            user:dataUser
        }
        response.json(data);
    } catch (err) {
        console.log(err);
        response.status(400).end();
    }
    
};

const loginCtrl = async (request, response) =>{
    try {
        request = request.body;
        const user = await User.findOne({mail:request.mail});
        if (!user) {
            response.status(404).end();
            return
        }
        const hashPassword = user.password;
        const check = await compare(request.password, hashPassword);
        if (!check){
            response.status(401).end();
            return
        }
        const data = {
            token: await tokenSign(user),
            user
        }
        response.json(data);
    } catch (err) {
        console.log(err);
        response.status(400).end();
    }
};

module.exports = { registerCtrl, loginCtrl }