const express = require('express');
const routes = require("./routes");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

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
  fetch('http://localhost:8080/api/productos')
    .then(resp => resp.json())
    .then((data) => {
      return res.render('layout/index', { productos: data});
    })
})

app.get("/", (req, res) => {
  return res.redirect("/productos")
})