// server.js
// Este archivo actúa como el punto de entrada de nuestro backend.
// Piensa en él como el "director" que recibe las peticiones del navegador,
// prepara el escenario, y llama a los módulos adecuados para responder.

const express = require('express'); // Importa Express para construir la API.
const cors = require('cors'); // Importa CORS para permitir peticiones desde el frontend.
const mongoose = require('mongoose'); // Importa Mongoose para conectarnos a MongoDB.
const dotenv = require('dotenv'); // Importa dotenv para leer variables de entorno.
const path = require('path'); // Importa path para resolver rutas de archivos.
const teamRoutes = require('./routes/teamRoutes'); // Importa las rutas del equipo.

// Cargar variables de entorno desde el archivo .env al proceso de Node.
dotenv.config();

const app = express(); // Crea una instancia de Express.
const PORT = process.env.PORT || 5000; // Puerto donde correrá el servidor.
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';
const publicPath = path.join(__dirname, '..', 'FrontEnd');

// Middleware: permite que el servidor entienda JSON en el cuerpo de las peticiones.
app.use(express.json());

// Middleware: habilita CORS para que el frontend pueda comunicarse con este backend.
app.use(cors());

// Servir archivos estáticos del frontend.
app.use(express.static(publicPath));

// Rutas del backend.
app.use('/api', teamRoutes);

// Servir la aplicación frontend en la raíz.
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Redirigir todas las demás rutas no API al frontend para que el navegador las maneje.
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Conexión inicial a MongoDB usando Mongoose.
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB correctamente.');
  })
  .catch((error) => {
    console.error('Error conectando a MongoDB:', error);
  })
  .finally(() => {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  });
