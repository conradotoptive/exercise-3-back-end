const { response } = require('express');
const { request } = require('express');
const Product = require('../db/productSchema');

const getItems = async (request, response) => {
    try {
        const data = await Product.find ({});
        response.json(data);
    } catch (err) {
        console.log(err);
        response.status(400).end();
    } 
};

const getActiveItems = async (request, response) => {
    try {
        const data = await Product.find({active:true});
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
        const product =  request.body;
        const newProductInfo = { 
            sku: product.SKU,
            price: product.price,
            name: product.name,
            description: product.description,
            image: product.image,
            shipmentDeliveryTime: product.shipmentDeliveryTime,
            active: product.active,
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

module.exports = { getItem, getItems, updateItem, getActiveItems }