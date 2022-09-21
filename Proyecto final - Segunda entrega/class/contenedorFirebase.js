const admin = require("firebase-admin");
const config = require("./config/config.js")

const privateKey = config.firebase.privateKey

try {
  admin.initializeApp({
    credential: admin.credential.cert(privateKey)
  });
  console.log('Se inicializó Firebase')
} catch (error) {
  console.log(error)
}

const db = admin.firestore();

class ContenedorFirebase {
  constructor() {
    this.collection = db.collection('carrito')
  }

  async getCartProducts(id) {
    try {
      return (await (this.collection.doc(id.toString()).get())).data().productos
    } catch(error) {
      console.log(error)
    }
  }

  async getCarts() {
    try {
      return await this.collection.get()
    } catch(error) {
      console.log(error)
    }
  }

  async create(carrito) {
    try{
        return await this.collection.doc(carrito.id.toString()).set(carrito);
    } catch (error) {
        console.log(error)
    }
  }

  async addProductOnCart(id, carrito) {
    try{
        return await this.collection.doc(id.toString()).set({
            productos: carrito
        });
    } catch (error) {
        console.log(error)
    }
  }

  async deleteCart(id) {
    try{
        return await this.collection.doc(id.toString()).delete();
    } catch (error) {
        console.log(error)
    }
  }
}

module.exports = ContenedorFirebase