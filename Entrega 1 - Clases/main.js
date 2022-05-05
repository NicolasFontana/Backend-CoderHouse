class Usuario {
  constructor (nombre, apellido, libros, mascotas) {
    this.nombre = nombre
    this.apellido = apellido
    this.libros = libros
    this.mascotas = mascotas
  }

  getFullName() {
    return `${this.nombre} ${this.apellido}`
  }

  addMascota(mascota) {
    this.mascotas.push(mascota)
  }

  countMascotas() {
    return this.mascotas.length
  }

  addBook(nombre, autor) {
    this.libros.push({nombre: nombre, autor: autor})
    return this.libros
  }

  getBookNames() {
    let nombreLibros = []
    for (let i = 0; i < this.libros.length; i++ ) {
      nombreLibros.push(this.libros[i].nombre)
    }
    return nombreLibros
  }
}

const usuario = new Usuario ('Nicolas', 'Fontana', [{nombre: 'Harry Potter', autor: 'J. K. Rowling'}, {nombre: 'Drácula', autor: 'Bram Stoker'}, {nombre: 'Padre rico, padre pobre', autor: 'Robert Kiyosaki'}], ['Shakira', 'Mia'])

// console.log(usuario.getFullName())

// console.log(usuario.addMascota('Ada'))

// console.log(usuario.countMascotas())

// console.log(usuario.addBook('The Chronicles of Narnia', 'Clive Staples Lewis'))

// console.log(usuario.getBookNames())
