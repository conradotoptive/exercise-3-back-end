const express = require('express')
var fixtureFactory = require('fixture-factory');

const productType = () => {
    const types = ['small', 'medium', 'large', 'x-large'];
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    const randomIndex = getRndInteger(0,3);
    return types[randomIndex];
}

var productsDataModel = {
    SKU: 'random.words',
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
    image: 'internet.image',
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

var userFixture = fixtureFactory.generateOne('product');

const app = express()

app.get('/', (request,response) => {
    response.send(userFixture)
})


const PORT = 3001
app.listen(PORT)
console.log('Server running on port', PORT)