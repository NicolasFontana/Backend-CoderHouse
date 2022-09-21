const dbProducts = require("../class/contenedorMongoAtlas");
const productos = new dbProducts();

const getProducts = async (req, res) => {
  try {
    let id = req.params.id;
    if (id) {
      return res.json(await productos.getProducts(id));
    } else {
      return res.json(await productos.getProducts());
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
  return res.json(await productos.getProducts())
}

const deleteProduct = async (req, res) => {
  let id = Number(req.params.id);
  return res.json(await productos.deleteById(id));
}

const putProduct = async (req, res) => {
    let obj = req.body;
    let id = Number(req.params.id);
    await productos.update(id, obj)
    return res.json(await productos.getProducts(id));
}

module.exports = {
  getProducts,
  postProduct,
  deleteProduct,
  putProduct
};