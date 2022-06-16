const { response, request } = require("express");
const Product = require('../db/productSchema');

let paginateOptions = {
    page: 1,
    limit : 10
}

const getItems = async (request, response) => {
    try {
        const { page } = request.body || 1;
        paginateOptions.page = page;
        const data = await Product.paginate({}, paginateOptions);
        response.json(data);
    } catch (err) {
        console.log(err);
        response.status(400).end();
    } 
};

const getActiveItems = async (request, response) => {
    try {
        const { page } = request.body || 1;
        paginateOptions.page = page;
        const data = await Product.paginate({active:true}, paginateOptions);
        response.json(data);
    } catch (err) {
        console.log(err);
        response.status(400).end();
    }
};

const getItem = async (request, response) => {
    try {
        const { id } = request.params;
        const data = await Product.findById(id)
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

const updateItem = async (request, response) => {
    try {
        const { id } = request.params;
        const { product, state } =  request.body;
        const newProductInfo = { 
            sku: product.SKU,
            price: product.price,
            name: product.name,
            description: product.description,
            image: product.image,
            shipmentDeliveryTime: product.shipmentDeliveryTime,
            active: state,
            size: product.size,
            quantity: product.quantity
        }
        const data = await Product.findByIdAndUpdate(id, newProductInfo, { new: true });  
        response.json(data);
        } catch (err) {
        console.log(err);
        response.status(400).end();
    }
};

const updateQuantity = async (request, response) => {
    try {
        const { id } = request.params;
        const { product } = request.body;
        const newQuantity = product.quantity > 0 ? product.quantity - 1 : 0;
        if (product.quantity === 0) {
            response.status(404).end();
            return
        }
        const newProductInfo = {
            sku: product.sku,
            price: product.price,
            name: product.name,
            description: product.description,
            image: product.image,
            shipmentDeliveryTime: product.shipmentDeliveryTime,
            active: product.active,
            size: product.size,
            quantity: newQuantity
        }
        const data = await Product.findByIdAndUpdate(product._id, newProductInfo, { new: true });
        response.json(data);
    } catch (err) {
        console.log(err);
        response.status(400).end();
    }
}

module.exports = { getItem, getItems, updateItem, getActiveItems, updateQuantity }