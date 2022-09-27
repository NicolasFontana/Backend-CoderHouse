const Contenedor = require("../class/contenedor");
const productos = new Contenedor("products");

const getProducts = async (req, res) => {
  try {
    let id = Number(req.params.id);
    if (id) {
      const result = await productos.getById(id);
      return res.send(result);
    } else {
      const result = await productos.getAll();
      return res.send(result);
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
  await productos.save(obj);
  const result = await productos.getAll()
  return res.json(result)
}

const deleteProduct = async (req, res) => {
  let id = Number(req.params.id);
  const result = await productos.deleteById(id)
  return res.json(result);
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