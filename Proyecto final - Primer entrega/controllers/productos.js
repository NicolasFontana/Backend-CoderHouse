const Contenedor = require("../class/contenedor");
const productos = new Contenedor("./data/productos.json");

const getProducts = async (req, res) => {
  try {
    let id = Number(req.params.id);
    if (id) {
      return res.json(productos.getById(id));
    } else {
      return res.json(productos.getAll());
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      data: undefined,
      error: true
    });
  }
}

const postProduct = async (req, res) => {
  let obj = req.body;
  productos.save(obj);
  return res.json(productos.getAll())
}

const deleteProduct = async (req, res) => {
  let id = Number(req.params.id);
  return res.json(productos.deleteById(id));
}

const putProduct = async (req, res) => {
    let obj = req.body;
    let id = Number(req.params.id);
    productos.update(id, obj)
    return res.json(productos.getById(id));
}

module.exports = {
  getProducts,
  postProduct,
  deleteProduct,
  putProduct
};