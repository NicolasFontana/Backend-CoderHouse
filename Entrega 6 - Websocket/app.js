const express = require("express");
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Contenedor = require("./class/contenedor");

const { Router } = express;

const PORT = 8000;
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = Router();
app.use("/api/productos", router);

app.set('view engine', 'ejs');
app.set("views", "./views");

const productos = new Contenedor(__dirname + "/data/productos.json");

const messages = []

io.on('connection', async (socket) => {
  console.log('Un cliente se ha conectado')
  socket.emit('messages', messages)

  socket.on('new-message', data => {
    messages.push(data)

    io.sockets.emit('messages', messages)
  })
  socket.on('update', () => {
    console.log(productos)
    io.sockets.emit('productos', productos)
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
  return res.json(productos.getAll())
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