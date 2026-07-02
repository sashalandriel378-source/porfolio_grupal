// controllers/teamController.js
// Aquí definimos las funciones que reciben una petición y devuelven una respuesta.
// Es como el "cocinero" que prepara la información antes de entregarla al cliente.

const TeamMember = require('../models/teamMember'); // Importa el modelo de Mongoose.

// Obtiene todos los integrantes del equipo desde la base de datos.
async function getTeamMembers(req, res) {
  try {
    const members = await TeamMember.find(); // Busca todos los documentos.
    res.status(200).json(members); // Envía los datos al frontend.
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los integrantes', error });
  }
}

// Crea un nuevo integrante en la base de datos.
async function createTeamMember(req, res) {
  try {
    const { name, role, avatar } = req.body; // Lee los datos enviados por el cliente.
    const newMember = new TeamMember({ name, role, avatar }); // Crea un nuevo documento.
    await newMember.save(); // Guarda en MongoDB.
    res.status(201).json(newMember); // Devuelve el miembro creado.
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el integrante', error });
  }
}

module.exports = {
  getTeamMembers,
  createTeamMember,
};
