const service = require("../services/estudianteService");

const obtenerTodos = (req, res) => {

    try {

        const estudiantes = service.obtenerTodos();

        res.status(200).json(estudiantes);

    } catch (error) {

        res.status(500).json({
            mensaje: "Error al obtener los estudiantes"
        });
    }
};

const obtenerPorId = (req, res) => {

    try {

        const id = Number(req.params.id);

        const estudiante = service.obtenerPorId(id);

        res.status(200).json(estudiante);

    } catch (error) {

        res.status(404).json({
            mensaje: error.message
        });
    }
};

const crear = (req, res) => {

    try {

        const estudiante =
            service.crear(req.body);

        res.status(201).json({
            mensaje:
                "Estudiante creado correctamente",
            estudiante
        });

    } catch (error) {

        res.status(
            error.statusCode || 500
        ).json({
            mensaje: error.message,
            errores: error.errors || null
        });
    }
};

const actualizar = (req, res) => {

    try {

        const id =
            Number(req.params.id);

        const estudiante =
            service.actualizar(
                id,
                req.body
            );

        res.status(200).json({
            mensaje:
                "Estudiante actualizado correctamente",
            estudiante
        });

    } catch (error) {

        res.status(
            error.statusCode || 500
        ).json({
            mensaje: error.message,
            errores: error.errors || null
        });
    }
};

const eliminar = (req, res) => {

    try {

        const id = Number(req.params.id);

        service.eliminar(id);

        res.status(200).json({
            mensaje: "Estudiante eliminado correctamente"
        });

    } catch (error) {

        res.status(404).json({
            mensaje: error.message
        });
    }
};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};