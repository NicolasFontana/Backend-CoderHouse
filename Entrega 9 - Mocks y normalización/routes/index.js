const express = require('express');
const productsRouter = require('./productos');
const cartRouter = require('./carrito')

const router = express.Router();

router
  .use('/api/productos', productsRouter)
  .use('/api/carrito', cartRouter)

module.exports = router;