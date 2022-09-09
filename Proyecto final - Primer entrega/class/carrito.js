const fs = require("fs").promises;
const { timeStamp } = require("console");
const { json } = require("express/lib/response");
const { writeFile, readFile } = require("fs");
const moment = require("moment");

class Contenedor1 {
    constructor(fileName){
        this.fileName = fileName;
        this.cart = [];
        this.id = 0;
    }

    async create(){
        const response = {
            data:[],
            error: 'No se pudo crear el carrito'
        }
        try {
            const file = await fs.readFile(this.fileName, "utf8")
            let cart = JSON.parse(file);
            this.id = cart.length +1;
            const newCart = {
                id: this.id,
                products: [],
                timestamp: moment().format('DD/MM/YYYY HH:mm:ss')
            }
            cart.push(newCart);
            try {
                await fs.writeFile(this.fileName,JSON.stringify(cart,null,2));
                response.data = this.id;
            }catch(err){
                response.error = err;
            }
            return response;
        }catch(err){
            const newCart = {
                id: 1,
                products: [],
                timestamp: moment().format('DD/MM/YYYY HH:mm:ss')
            }
            try {
                await fs.writeFile(this.fileName,JSON.stringify([newCart],null,2))
                response.data = newCart.id;
            }catch(err){
                response.error = err;
            }
        }
        return response;
    };

    async deleteCartById(id){
        const response = {
            data:"",
            error: 'No se pudo borrar el carrito'
        }
        try {
            const file = await fs.readFile(this.fileName, "utf8")
            let carts = JSON.parse(file);
            this.data = carts;
            const deleteIndex = this.data.findIndex(cart => cart.id == id);
            if (deleteIndex === -1 ){
                console.log("Id no encontrado; ");
                response.data = "Id no encontrado"
            } else{
                this.data.splice(deleteIndex,1)
                await fs.writeFile(this.fileName, JSON.stringify(this.data, null, 2));
                response.data = "Carrito eliminado con éxito";
            }
        } catch(err){
            response.error = err;
        }
            return response;
    }

    async addToCart(idCart, productId) {
        const response = {
            data:"",
            error: 'Id no encontrado'
        }
        try{
            const productsTxt = await fs.readFile("./data/productos.json", "utf8");
            const productsJSON = JSON.parse(productsTxt);
            const productFind = productsJSON.find(product => product.id == productId);
            if(!productFind){
                response.error = 'Id de producto no encontrado';
            } else {
                const file = await fs.readFile(this.fileName, "utf8")
                let carts = JSON.parse(file);
                this.data = carts;
                const cartIndex = carts.findIndex(cart => cart.id == idCart);
                if(cartIndex === -1){
                    response.error = 'Id de carrito no encontrado';
                }else{
                    const newProductOnCart = {
                    ...productFind,
                    stock: productFind.stock - 1,
                    timeStamp:moment().format("DD/MM/YYYY HH:mm:ss")
                    }
                    carts[cartIndex].products.push(newProductOnCart);
                    await fs.writeFile(this.fileName, JSON.stringify(carts, null, 2));
                }
                response.data = "Product added to cart";
                return response;
                }
        } catch (error) {
            response.error = 'Error de lectura';
        }
        return response;
    }

    async getCartProducts(id) {
        const response = {
            data:{},
            error: 'Carrito no encontrado'
        }
        try {
            const file = await fs.readFile(this.fileName, "utf8")
            let carts = JSON.parse(file);
            this.data = carts;
            const cartIndex = carts.find(cart => cart.id === parseInt(id));
            if(cartIndex === -1){
                response.error = "Carrito no encontrado";
            } else {
                response.data = cartIndex;
            }
            return response;
        } catch (error) {
            return response;
        }
    }

    deleteProductCart = async (idCart, idProduct) =>{
        const response = {
            data: undefined,
            error: ''
        }
        try{
            const file = await fs.readFile(this.fileName, "utf8")
            let carts = JSON.parse(file);
            this.data = carts;
            const cartIndex = carts.findIndex(cart => cart.id == idCart);
            if(cartIndex === -1){
                response.error = 'ID de carrito no encontrado'
            } else{
                const productIndex = carts[cartIndex].products.findIndex(product => product.id == idProduct);
                if(productIndex === -1){
                    response.error = 'ID de producto no encontrado';
                } else {
                    carts[cartIndex].products.splice(productIndex, 1);
                await fs.writeFile(this.fileName, JSON.stringify(carts, null, 2));
                response.data = "Producto eliminado con éxito";
            }
            return response;
            }
        }  catch (error) {
            return 'Error de lectura'+ error;
        }
        return response
    }
}

module.exports = Contenedor1;