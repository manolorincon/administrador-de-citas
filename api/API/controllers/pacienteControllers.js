//importar modelo
const Paciente = require('../models/Paciente');

//Funciones asociadas al modelo y al routing

//Cuando se crea un nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
    const paciente = new Paciente(req.body);
    console.log(req.body);
    try {
        await paciente.save(); //metodo save es de mongodb
        res.json({ mensaje: 'El registro se agregó a la base de datos correctamente' })
    } catch (error) {
        console.log(error);
        next();
    }

    res.json({mensaje: 'El cliente se agregó correctamente'});
}

exports.obtenerPacientes = async(req, res, next) => {
    try {
        const pacientes = await Paciente.find({});
        res.json(pacientes);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.obtenerPaciente = async(req, res, next) => {
    try {
        const paciente = await Paciente.findById(req.params.id);
        res.json(paciente);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.actualizarPaciente = async(req, res, next) => {
    try {
        const paciente = await Paciente.findOneAndUpdate({ _id : req.params.id }, req.body, {
            new : true //para que nos devuelva el nuevo registro actualizado. Si no lo especificamos, devuelve el anterior.
        });
        res.json(paciente);
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.eliminarPaciente = async(req, res, next) => {
    try {
        const pacientes = await Paciente.findOneAndDelete({ _id : req.params.id });
        res.json({ mensaje: 'El registro fue eliminado satisfactoriamente de la base de datos' });
    } catch (error) {
        console.log(error);
        next();
    }
}
