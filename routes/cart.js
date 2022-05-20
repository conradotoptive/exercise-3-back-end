const express = require('express');
const router = express.Router();
const { getItems,
    getItem,
    postItem,
    deleteItem,
    updateItem } = require('../controllers/cart');

//get all items in the cart
router.get('/', getItems);

//get one item in the cart
router.get('/:id', getItem);

//create new item in the cart
router.post('/', postItem);

//delete one item in the cart
router.delete('/:id', deleteItem);

//buys one item in the cart
router.put('/:id', updateItem)

module.exports = router;