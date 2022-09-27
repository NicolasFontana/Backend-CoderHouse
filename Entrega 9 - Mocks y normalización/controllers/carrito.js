const ModelCart = require('../class/carrito');
const modelCart = new ModelCart("./data/carrito.json")

const createCart = async (req, res) => {
    const {data, error} =  await modelCart.create();
    data > 0 ? res.send(JSON.stringify(data)) : res.status(500).send(error);
}

const deleteCart = async (req, res) => {
    const {data, error} = await modelCart.deleteCartById(req.params.id);
    data ? res.send(data) : res.status(500).send(error);
}

const deleteProductOnCart = async (req, res) => {
    const { id } = req.params;
    const {  idProduct } = req.params;
    const {data, error} = await modelCart.deleteProductCart(id, idProduct);
    data ? res.send(data) : res.status(500).send(error);
}

const getCartProducts = async (req, res) => {
    const { id } = req.params;
    const {data, error} = await modelCart.getCartProducts(id);
    data  ? res.send(data.products) : res.status(500).send(error);
}

const addProductOnCart = async (req, res) => {
    const { id, productId } = req.params;
    const {data, error} = await modelCart.addToCart(id , productId);
    data  ? res.send(data) : res.status(500).send(error);
}

module.exports = {
    createCart,
    deleteCart,
    deleteProductOnCart,
    getCartProducts,
    addProductOnCart
}