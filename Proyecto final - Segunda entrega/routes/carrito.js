const express = require('express');
const controller = require('../controllers/carrito');
const router = express.Router();
const auth = require('../middleware/auth')

router
  .post('/', auth(true), controller.createCart)
  .delete('/:id', auth(true), controller.deleteCart)
  // .delete('/:id/productos/:idProduct', auth(true), controller.deleteProductOnCart)
  .put('/:id/productos/:productId', auth(true), controller.addProductOnCart)
  .get('/:id/productos', auth(true), controller.getCartProducts)

module.exports = router;