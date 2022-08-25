const express = require("express");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Contenedor = require("./class/contenedor");

const { Router } = express;

const PORT = 8000;
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
app.use(express.urlencoded({ extended: true }));

const router = Router();
const productos = new Contenedor(__dirname + "/data/productos.json");

app.use("/api/productos", router);
app.use(express.static("./views/layout"));
app.set('view engine', 'ejs');

const messages = []

io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado')

  socket.emit('messages', messages)

  socket.on('new-message', data => {
    messages.push(data)

    io.sockets.emit('messages', messages)
  })
})

httpServer.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

router.get("/", (req, res) => {
    return res.json(productos.getAll());
  });

router.get("/:id", (req, res) => {
  let id = Number(req.params.id);
  return res.json(productos.getById(id));
});

router.post("/", (req, res) => {
  let obj = req.body;
  productos.save(obj);
  return res.redirect('/productos');
});

router.put("/:id", (req, res) => {
  let obj = req.body;
  let id = Number(req.params.id);
  return res.json(productos.update(id, obj));
});

router.delete("/:id", (req, res) => {
  let id = Number(req.params.id);
  return res.json(productos.deleteById(id));
});

app.get("/productos", (req, res) => {
  return res.render('layout/index', { productos });
})

app.get("/", (req, res) => {
  return res.redirect("/productos")
})