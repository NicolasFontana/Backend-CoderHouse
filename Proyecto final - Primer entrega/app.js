const express = require('express');
const routes = require("./routes");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Contenedor = require("./class/contenedor");
const productos = new Contenedor("./data/productos.json");
const productList = productos.content

const PORT = 8080;
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.set('view engine', 'ejs');
app.set("views", "./views");

const messages = []

io.on('connection', async (socket) => {
  console.log('Un cliente se ha conectado')
  socket.emit('messages', messages)

  socket.on('new-message', data => {
    messages.push(data)

    io.sockets.emit('messages', messages)
  })

  socket.on('update', (res) => {
    io.sockets.emit('productos', res)
  })
})

httpServer.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// front
app.get("/productos", async (req, res) => {
  return res.render('layout/index', { productos: productos.content});
})

app.get("/", (req, res) => {
  return res.redirect("/productos")
})