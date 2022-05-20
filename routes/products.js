const express = require('express');
const router = express.Router();
const { getItems, 
    getItem, 
    updateItem, 
    getActiveItems } = require('../controllers/products');
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

module.exports = router