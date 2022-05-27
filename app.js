require('dotenv').config();
const Product = require('./db/productSchema');
const cors = require('cors');
const express = require('express');
const initDB = require('./db/connection');
var fixtureFactory = require('fixture-factory');

initDB();
const app = express();
app.use(cors());
app.use(express.json());


const productSize = () => {
    const types = ['x-small', 'small', 'medium', 'large', 'x-large'];
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    const randomIndex = getRndInteger(0,4);
    return types[randomIndex];
}

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

var productDataModel = {
    sku: '',
    price: {
        method: 'random.number',
        args: [
            {
                min: 1,
                max: 200
            }
        ]
    },
    name: 'random.word',
    description: 'random.words',
    image: 'random.image',
    shipmentDeliveryTime: {
        method: 'random.number',
        args: [
            {
                min: 3,
                max: 5
            }
        ]
    },
    active: true,
    size: '',
    quantity: {
        method: 'random.number',
        args: [
            {
                min: 1,
                max: 30
            }
        ]
    }
};


fixtureFactory.register('product', productDataModel);
//let products = Product.find()
//console.log(products)
//let productItems = db.products.count();
//console.log(productItems);

for (let index = 0; index < 100; index++) {
    let productFixture = fixtureFactory.generateOne('product');
    productFixture.sku = randomString(12, '0123456789abcdefghijklmnopqrstuvwxyz');
    productFixture.size = productSize();
    const newProduct = new Product(productFixture);
    newProduct.save();
}

app.use("/api", require("./routes"))

/*app.use((request,response) => {
    response.status(404).json({
        error : 'Not Found'
    })
})*/

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
})

