const mongoose = require('mongoose');
const productsCollection = 'products';

const ProductsSchema = new mongoose.Schema({
  title: String,
  price: Number,
  stock: Number,
  thumbnail: String,
})

let products = mongoose.model(productsCollection, ProductsSchema);
module.exports = { products }