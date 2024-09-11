const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Arreglo de usuarios
let usuarios = [
  { id: 1, nombre: "Ana García", email: "ana@example.com", edad: 28 },
  { id: 2, nombre: "Carlos López", email: "carlos@example.com", edad: 35 },
  { id: 3, nombre: "Elena Martínez", email: "elena@example.com", edad: 42 }
  { id: 4, nombre: "Pepe Garcia", email: "pepe@example.com", edad: 25 }
];

// Función para generar un nuevo ID
const generarNuevoId = () => {
  return Math.max(...usuarios.map(u => u.id)) + 1;
};

// Rutas
// GET todos los usuarios
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

// GET un usuario por ID
app.get('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }
});

// POST crear un nuevo usuario
app.post('/usuarios', (req, res) => {
  const nuevoUsuario = {
    id: generarNuevoId(),
    nombre: req.body.nombre,
    email: req.body.email,
    edad: req.body.edad
  };
  usuarios.push(nuevoUsuario);
  res.status(201).json(nuevoUsuario);
});

// PUT actualizar un usuario
app.put('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);
  if (index !== -1) {
    usuarios[index] = { ...usuarios[index], ...req.body, id };
    res.json(usuarios[index]);
  } else {
    res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }
});

// DELETE eliminar un usuario
app.delete('/usuarios/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = usuarios.findIndex(u => u.id === id);
  if (index !== -1) {
    const usuarioEliminado = usuarios.splice(index, 1);
    res.json({ mensaje: 'Usuario eliminado', usuario: usuarioEliminado[0] });
  } else {
    res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
