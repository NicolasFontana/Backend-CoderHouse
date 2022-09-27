window.onload = () => {
  const socket = io.connect()
  const formAddProduct = document.querySelector('#formAddProduct')
  const containerChat = document.querySelector('#myChat')

  // Chat

  socket.on('messages', function(data) { renderMessages(data) })

  containerChat.addEventListener('submit', (e) => {
    e.preventDefault();
    addMessage();
  })

  function renderMessages(data) {
    console.log(data)
    const html = data.map((elem) => {
      return(`
      <div class="d-flex">
      <div class="d-block text-primary me-1 fw-semibold">${elem.author.alias}</div>
      <div class="d-flex me-1" style="color:brown;">[${elem.date}]: </div>
      <div class="text-success fst-italic">${elem.text}</div>
      </div>
      `)
    }).join(" ")
    document.getElementById('container-messages').innerHTML = html
  }

  function addMessage() {
    const message = {
      author: {
        id: document.getElementById('id').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        age: document.getElementById('age').value,
        alias: document.getElementById('alias').value,
        avatar: document.getElementById('avatar').value,
      },
      text: document.getElementById('message').value,
      date: new Date().toLocaleString(),
    }
    socket.emit('new-message', message)
    document.querySelector('#message').value = ""
  }

  // Agregar productos
  socket.on('productos', listProd => {
    loadProds(listProd)
  })

  formAddProduct.addEventListener('submit', (e) => {
    e.preventDefault();
    const prod = { title: formAddProduct[0].value, price: formAddProduct[1].value, thumbnail: formAddProduct[2].value }
    fetch('/api/productos', {
      method: 'POST',
      body: JSON.stringify(prod),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then( res => res.json())
    .then( res => {
      formAddProduct.reset()
      socket.emit('update', res)
    })
    .catch( error => console.log(error))
  })

  async function loadProds(productos) {
    fetch('partials/products-list.ejs')
    .then(res => res.text())
    .then(plantilla => {
      var template = ejs.compile(plantilla);
      let html = template({ productos })
      document.querySelector('#container-table').innerHTML = html
    })
  }
}