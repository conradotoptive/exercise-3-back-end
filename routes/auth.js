const express = require('express');
const router = express.Router();
const { registerCtrl, loginCtrl, updateWallet } = require('../controllers/auth');

//register a user
router.post("/register", registerCtrl);

//log In a user
router.post("/login", loginCtrl);

//update the wallet of an user
router.put("/wallet/:id", updateWallet);

module.exports = router;