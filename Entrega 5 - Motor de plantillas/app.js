const express = require("express");
const Contenedor = require("./class/contenedor");
const { Router } = express;

const PORT = 8000
const app = express();
app.use(express.urlencoded({ extended: true }));

const router = Router();
const productos = new Contenedor(__dirname + "/data/productos.json");

app.use("/api/productos", router);
app.set('view engine', 'ejs');

app.listen(PORT, () => {
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
  return res.render('index', { productos });
})