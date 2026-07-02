// routes/teamRoutes.js
// Este archivo define las rutas HTTP que el frontend puede usar.
// Piensa en él como el mapa de caminos que conecta URLs con funciones.

const express = require('express'); // Importa Express para crear rutas.
const router = express.Router(); // Crea un router independiente.
const { getTeamMembers, createTeamMember } = require('../controllers/teamController');

// Ruta para obtener todos los miembros del equipo.
router.get('/team', getTeamMembers);

// Ruta para crear un nuevo miembro del equipo.
router.post('/team', createTeamMember);

module.exports = router; // Exporta el router para usarlo en server.js.
