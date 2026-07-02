// models/teamMember.js
// Este archivo define cómo se almacena cada integrante del equipo en MongoDB.
// Imagina una plantilla o formulario que especifica qué campos debe tener cada registro.

const mongoose = require('mongoose'); // Importa mongoose para crear el esquema.

// Creamos un esquema de Mongoose, que es como una "hoja de ruta" de los datos.
const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String, // El nombre debe ser un texto.
    required: true, // Es obligatorio que exista.
    trim: true, // Elimina espacios en blanco al inicio y final.
  },
  role: {
    type: String, // El rol también es texto.
    required: true, // Es obligatorio.
    trim: true,
  },
  avatar: {
    type: String, // La URL del avatar es una cadena de texto.
    required: true, // La ruta de la imagen debe existir.
    trim: true,
  },
}, {
  timestamps: true, // Agrega automáticamente createdAt y updatedAt.
});

// Exportamos el modelo para usarlo en otras partes de la app.
// El primer parámetro es el nombre del modelo, el segundo es el esquema.
module.exports = mongoose.model('TeamMember', teamMemberSchema);
