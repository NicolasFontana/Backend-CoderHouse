const express = require('express');
const controller = require('../controllers/productos');
const auth = require('../middleware/auth')

const router = express.Router();

router
  .get('/:id?', auth(true), controller.getProducts)
  .post('/', auth(true), controller.postProduct)
  .delete('/:id', auth(true), controller.deleteProduct)
  .put('/:id', auth(true), controller.putProduct)

module.exports = router;