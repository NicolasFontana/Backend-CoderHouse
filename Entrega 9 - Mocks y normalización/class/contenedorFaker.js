const {faker} = require('@faker-js/faker')


function generateRandomProduct(cant) {
    const listProd = [];
    for (let index = 0; index < cant; index++) {
        const prod = {
            id : index + 1 ,
            title: faker.commerce.productName(),
            price: faker.commerce.price(),
            thumbnail: faker.image.imageUrl()
        }
        listProd.push(prod)
        //console.log(listProd)
    }
    return listProd
}


module.exports = generateRandomProduct