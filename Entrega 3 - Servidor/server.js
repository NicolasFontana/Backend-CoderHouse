const express = require('express');
const app = express();
const Contenedor = require ('./src/files/clases/Contenedor');
const contenedor1 = new Contenedor('productos.txt');
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));

app.get('/products', async (req, resp) => {
    let products = await contenedor1.getAll();
    resp.send(products);
});

app.get('/productoRandom', async (req, resp) => {
    let products = await contenedor1.getAll();
    let productoRandom = Math.floor(Math.random() * products.length);
    resp.send(products[productoRandom]);
});