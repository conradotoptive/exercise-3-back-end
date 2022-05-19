const express = require('express');
const router = express.Router();
const { registerCtrl, loginCtrl } = require('../controllers/auth');

//register a user
router.post("/register", registerCtrl);

//log In a user
router.post("/login", loginCtrl);

module.exports = router;