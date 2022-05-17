const express = require('express');
const router = express.Router();
const { getItems, 
    getItem, 
    updateItem, 
    getActiveItems } = require('../controllers/products')

//get all products
router.get('/all', getItems);

//get all active products
router.get('/', getActiveItems);

//get a specific product
router.get('/:id',getItem);

//update the active parameter of a product
router.put('/:id', updateItem);

module.exports = router