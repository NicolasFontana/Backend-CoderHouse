const dbCarrito = require('../class/contenedorFirebase')
const dbProducts = require('../class/contenedorMongoAtlas')
const carritos = new dbCarrito()
const productos = new dbProducts()


const createCart = async (req, res) => {
    let cantCarritos = await carritos.getCarts()
    cantCarritos = cantCarritos.docs.length
    let newId
    if (cantCarritos == 0) {
        newId = 1
    } else {
        newId = cantCarritos + 1
        newId++
    }
    let nuevoCarrito = {
        id: newId,
        timesTamp: new Date(),
        productos: []
    }
    await carritos.create(nuevoCarrito)
    return res.status(201).json({
        message: 'Carrito creado',
        data: nuevoCarrito,
        error: false
    })
}

const deleteCart = async (req, res) => {
    await carritos.deleteCart(req.params.id)
    return res.status(204).json({
        message: `Carrito con id ${req.params.id} eliminado`,
        data: undefined,
        error: false
    })
}

// const deleteProductOnCart = async (req, res) => {
//     const { id } = req.params;
//     const {  idProduct } = req.params;
//     const {data, error} = await modelCart.deleteProductCart(id, idProduct);
//     data ? res.send(data) : res.status(500).send(error);
// }

const getCartProducts = async (req, res) => {
    let productosCarrito = await carritos.getCartProducts(req.params.id);
    console.log(productosCarrito)
    if(productosCarrito) {
        return res.status(200).json({
            message: 'Productos encontrados',
            data: productosCarrito,
            error: false
        })
    }
    return res.status(404).json({
        message: 'Carrito inexistente',
        data: undefined,
        error: true
    })
}

const addProductOnCart = async (req, res) => {
    const producto = await productos.getProducts(req.params.productId)
    const prod = {
        id: producto[0]._id.toString(),
        title: producto[0].title,
        price: producto[0].price,
        stock: producto[0].stock,
        thumbnail: producto[0].thumbnail
    }
    if (producto) {
        const carrito = await carritos.getCartProducts(req.params.id)
        carrito.push(prod)
        await carritos.addProductOnCart(req.params.id, carrito)
        return res.status(201).json({
            message: 'Producto agregado al carrito',
            data: prod,
            error: false
        })
    } else {
        res.send('Producto no encontrado')
    }
}

module.exports = {
    createCart,
    deleteCart,
    // deleteProductOnCart,
    getCartProducts,
    addProductOnCart
}