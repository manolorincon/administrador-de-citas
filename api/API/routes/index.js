const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteControllers');

module.exports = function () {
    //agregarPaciente
    router.post('/pacientes', 
        pacienteController.nuevoCliente
    )

    router.get('/pacientes', 
        pacienteController.obtenerPacientes
    )

    router.get('/paciente/:id',
        pacienteController.obtenerPaciente
    )

    router.put('/paciente/:id',
        pacienteController.actualizarPaciente
    )

    router.delete('/paciente/:id',
        pacienteController.eliminarPaciente
    )

    return router;
}