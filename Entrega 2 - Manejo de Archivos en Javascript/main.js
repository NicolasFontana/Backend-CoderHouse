
const fs = require("fs");
let productArray = [];
let productObject = {};

class Contenedor {

    constructor(nombreDelArchivo) {
        this.nombreDelArchivo = "./" + nombreDelArchivo;
    }

    async save(producto) {
        try {
            productObject = producto;
            productObject.id = productArray.length + 1;
            productArray.push(productObject);
            await fs.promises.writeFile(this.nombreDelArchivo, JSON.stringify(productArray, null, 2));
        }
        catch (err) {
            console.log(err);
        }
    }

    async getById(id) {
        try {
            productArray = JSON.parse(await fs.promises.readFile(this.nombreDelArchivo, "utf8"));
            let productById = productArray.find((product) => product.id == id);
            productById === undefined ? console.log(null) : console.log(productById);
        }
        catch (err) {
            console.log(err);
        }
    }

    async getAll() {
        try {
            productArray = JSON.parse(await fs.promises.readFile(this.nombreDelArchivo, "utf8"));
            console.log(productArray)
        }
        catch (err) {
            console.log(err);
        }

    }

    async deleteById(id) {
        try {
            productArray = JSON.parse(await fs.promises.readFile(this.nombreDelArchivo, "utf8")).filter((product) => product.id != id);
            fs.writeFileSync(this.nombreDelArchivo, JSON.stringify(productArray, null, 2));
        }
        catch (err) {
            console.log(err);
        }
    }

    async deleteAll() {
        productArray = [];
        await fs.promises.writeFile(this.nombreDelArchivo, productArray);
    }
}

const Productos = new Contenedor("productos.txt");
Productos.save({
    title: "Escuadra",
    price: 123.45,
    thumbnail:
        "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
});
Productos.save({
    title: "Calculadora",
    price: 234.56,
    thumbnail:
        "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
});
Productos.save({
    title: "Globo Terráqueo",
    price: 345.67,
    thumbnail:
        "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
});

// Productos.deleteById(1)

// Productos.deleteAll()


