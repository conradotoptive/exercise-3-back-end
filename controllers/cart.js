const { response, request } = require("express");
const Cart = require('../db/cartSchema');

let paginateOptions = {
    page: 1,
    limit : 100
};

const getItems = async (request,response) => {
    try {
        const { userId }  = request.body;
        const data = await Cart.paginate({bought: false, userId: userId}, paginateOptions);
        response.json(data);
    } catch (err) {
        console.log(err);
        response.status(400).end();
    }
};

const getBoughtItems = async (request,response) => {
    try {
        const { userId }  = request.body;
        const data = await Cart.paginate({bought: true, userId: userId}, paginateOptions);
        response.json(data);
    } catch (err) {
        console.log(err);
        response.status(400).end();
    }
};

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
};

const postItem = async (request,response) => {
    try {
        const { user, product, quantity } = request.body;
        const newCartItem = {
            name: product.name,
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
};

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
};

const updateItem = async (request, response) => {
    try {
        const { id } = request.params;
        const { cart } =  request.body;
        const newCartInfo = {
            name: cart.name,
            userId: cart.userId,
            productId: cart.productId,
            bought: true,
            quantity: cart.quantity
        }
        const data = await Cart.findByIdAndUpdate(id, newCartInfo, { new: true });  
        response.json(data);
        } catch (err) {
        console.log(err);
        response.status(400).end();
    }
};

module.exports = { getItem, getItems, postItem, deleteItem, updateItem, getBoughtItems }