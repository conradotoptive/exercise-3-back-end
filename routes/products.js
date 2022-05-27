const express = require('express');
const router = express.Router();
const { getItems, 
    getItem, 
    updateItem, 
    getActiveItems,
    updateQuantity } = require('../controllers/products');
const checkRol = require('../middleware/rol');
const authMiddleware = require ('../middleware/session');

//get all products
router.get('/all', checkRol(["admin"]), getItems);

/*//get all active products
router.get('/', authMiddleware, getActiveItems);*/

//get all active products
router.get('/', getActiveItems);

//get a specific product
router.get('/:id', getItem);

//update the active parameter of a product
router.put('/:id', checkRol(["admin"]), updateItem);

//update the quantity of itmes of a certain product when you buy it
router.put('/quantity/:id', updateQuantity);

module.exports = router