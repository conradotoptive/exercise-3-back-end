require('dotenv').config();

const { request } = require('express');
const { response } = require('express');
const cors = require('cors');
const express = require('express');
const initDB = require('./db/connection');
const Product = require('./db/productSchema');

initDB();
const app = express();
var fixtureFactory = require('fixture-factory');
const { where } = require('./db/productSchema');

app.use(cors());

const productType = () => {
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

var productsDataModel = {
    SKU: randomString(12, '0123456789abcdefghijklmnopqrstuvwxyz'),
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
    descrpition: 'random.words',
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
    size: productType(),
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

fixtureFactory.register('product', productsDataModel);

/*for (let index = 0; index < 2; index++) {
    var productFixture = fixtureFactory.generateOne('product');
    const newProduct = new Product({
        sku: productFixture.SKU,
        price: productFixture.price,
        name: productFixture.name,
        description: productFixture.description,
        image: productFixture.image,
        shipmentDeliveryTime: productFixture.shipmentDeliveryTime,
        active: productFixture.active,
        size: productFixture.size,
        quantity: productFixture.quantity
    })
    newProduct.save();
}*/

//get all products
app.get('/products', (request,response) => {
    Product.find({}).then(products => {
            response.json(products)
    })
})

//get a specific product
app.get('/products/:id', (request,response) => {
    const { id } = request.params;
    Product.findById(id).then(product => {
        if (product) {
            response.json(product);
        } else {
            response.status(404).end();
        } 
    }).catch(err => {
        response.status(400).end();
    })
})

//update the active parameter of a product
app.put('/products/:id', (request, response,) => {
    const { id } = request.params
    const product = request.body
  
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
  
    Note.findByIdAndUpdate(id, newProductInfo, { new: true })
      .then(result => {
        response.json(result)
      })
      .catch(err =>{
          response.status(400).end();
      })
  })

app.use((request,response) => {
    response.status(404).json({
        error : 'Not Found'
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log('Server running on port', PORT);
})

