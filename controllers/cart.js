const { response, request } = require("express");
const Cart = require('../db/cartSchema');

const paginateOptions = {
    page: 1,
    limit : 10
}

const getItems = async (request,response) => {
    try {
        const data = await Cart.paginate({}, paginateOptions);
        response.json(data);
    } catch (err) {
        console.log(err);
        response.status(400).end();
    }
}

const getItem = async (request,response) => {
    try {
        const { id } = request.params;
        const data = await Cart.findById(id)
        if (data) {
            response.json(data);
        } else {
            response.status(404).end();
        } 
    } catch (err) {
        console.log(err);
        response.status(400).end();
    }
}

const postItem = async (request,response) => {
    try {
        const { user, product, quantity } = request.body;
        const newCartItem = {
            userId: user._id,
            productId: product._id,
            bought: false,
            quantity: quantity
        };
        const newCart = new Cart(newCartItem);
        newCart.save();
        response.json(newCart);
    } catch (err) {
        console.log(err);
        response.status(400).end();
    }
}

const deleteItem = async (request,response) => {
    try {
        const {id} = request.params;
        const item = Cart.findById(id);
        Cart.findByIdAndDelete(id);
        response.json(item);
    } catch (err) {
        console.log(err);
        response.status(400).end();
    }
}

module.exports = { getItem, getItems, postItem, deleteItem }