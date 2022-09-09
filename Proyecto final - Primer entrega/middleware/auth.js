const auth = rol => {
  return (req, res ,next) => {
    console.log(rol)
      if (rol) {
          next()
      } else {
          res.status(403).json({
              error: -1,
              descripcion: `Ruta: ${req.baseurl} no autorizada`
          })
      }
  }
}

module.exports = auth;