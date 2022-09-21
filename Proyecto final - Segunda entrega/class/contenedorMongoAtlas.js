const models = require('../models/products.js')
const mongoose = require('mongoose')
const config = require('./config/config')

let conection = async () => {
  try {
    await mongoose.connect(config.mongodb.url)
  } catch (error) {
    console.log(error)
  }
}

class ContenedorMongodb {
  constructor() {
    conection();
  }

  getProducts(id) {
    if(id) {
      return models.products.find({_id: id})
    } else {
      return models.products.find()
    }
  }

  save(obj) {
    return models.products.create(obj)
  }

  update(id, obj) {
    return models.products.findOneAndUpdate({id: id}, obj)
  }

  deleteById(id) {
    return models.products.findOneAndDelete({id: id})
  }
}

module.exports = ContenedorMongodb;