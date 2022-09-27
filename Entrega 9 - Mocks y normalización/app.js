const express = require('express');
const routes = require("./routes");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Contenedor = require("./class/contenedor");
const productos = new Contenedor("products");
const ContenedorMsg = require("./class/contenedorMsg");
const apiChat = new ContenedorMsg("messages");
const generateRandomProduct = require('./class/contenedorFaker')

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

let messages = []

io.on('connection', async (socket) => {
  console.log('Un cliente se ha conectado')
  /* MENSAJES */
  let messagesToEmit = await apiChat.readChatFromFile();

  messages.splice(0, messages.length);
  for (const m of messagesToEmit) {
    messages.push(m);
  }

  socket.emit("messages", messagesToEmit);

  socket.on("new-message", async (data) => {
    data.id = messages.length+1
    messages.push(data);

    await apiChat.writeChatToFile(messages);
    io.sockets.emit("messages", [data]);
  });
  //
  // const allMessages = await messages.getAll()
  // console.log(allMessages)
  // socket.emit('messages', allMessages)
  // socket.on('new-message', async (data) => {
  //   await messages.save(data)
  //   const allMessages = await messages.getAll()
  //   io.sockets.emit('messages', allMessages)
  // })

  /* PRODUCTOS */
  socket.on('update', (res) => {
    io.sockets.emit('productos', res)
  })
})

httpServer.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// front
app.get("/productos", async (req, res) => {
  const listProducts = await productos.getAll()
  return res.render('layout/index', { productos: listProducts });
})

app.get("/", (req, res) => {
  return res.redirect("/productos")
})

// FAKER PRODUCTS

const listProdFaker = generateRandomProduct(5)

app.get("/api/productos-test", (req, res) => {
  res.render('layout/index', {productos: listProdFaker})
})