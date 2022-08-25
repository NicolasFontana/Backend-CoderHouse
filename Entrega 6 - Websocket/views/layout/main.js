const socket = io.connect();

document.querySelector('#myChat').addEventListener('submit', (e) => {
  e.preventDefault();

  addMessage();
})

function addMessage() {
  const message = {
    username: document.getElementById('username').value,
    date: new Date().toLocaleString(),
    message: document.querySelector('#message').value
  }
  console.log(message);
  socket.emit('new-message', message);
}

function render(data) {
  const html = data.map((elem) => {
    return(`
      <div class="d-flex">
        <div class="d-block text-primary me-1 fw-semibold">${elem.username}</div>
        <div class="d-flex me-1" style="color:brown;">[${elem.date}]: </div>
        <div class="text-success fst-italic">${elem.message}</div>
      </div>
    `)
  }).join(" ")

  document.getElementById('container-messages').innerHTML = html
}

socket.on('messages', function(data) { render(data) })