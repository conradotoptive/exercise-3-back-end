const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const userSchema = new Schema({
    userName: String,
    e_mail: String,
    password: String
})

const User = mongoose.model('User', userSchema);

module.exports = User