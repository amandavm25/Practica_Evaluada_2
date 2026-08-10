const repository = require("../repositories/estudianteRepository");

const obtenerTodos = () => {
    return repository.obtenerTodos();
};

const obtenerPorId = (id) => {
    const estudiante = repository.obtenerPorId(id);

    if (!estudiante) {
        throw new Error("Estudiante no encontrado");
    }

    return estudiante;
};

const crear = (datos) => {

    if (
        !datos.cedula ||
        !datos.nombre ||
        !datos.apellido ||
        !datos.correo ||
        !datos.carrera ||
        !datos.edad
    ) {
        throw new Error("Todos los campos son obligatorios");
    }

    const estudiantes = repository.obtenerTodos();

    const cedulaExiste = estudiantes.some(
        estudiante => estudiante.cedula === datos.cedula
    );

    if (cedulaExiste) {
        throw new Error("La cédula ya está registrada");
    }

    return repository.crear({
        cedula: datos.cedula,
        nombre: datos.nombre,
        apellido: datos.apellido,
        correo: datos.correo,
        carrera: datos.carrera,
        edad: Number(datos.edad)
    });
};

const actualizar = (id, datos) => {

    const estudiante = repository.obtenerPorId(id);

    if (!estudiante) {
        throw new Error("Estudiante no encontrado");
    }

    if (
        !datos.cedula ||
        !datos.nombre ||
        !datos.apellido ||
        !datos.correo ||
        !datos.carrera ||
        !datos.edad
    ) {
        throw new Error("Todos los campos son obligatorios");
    }

    return repository.actualizar(id, {
        cedula: datos.cedula,
        nombre: datos.nombre,
        apellido: datos.apellido,
        correo: datos.correo,
        carrera: datos.carrera,
        edad: Number(datos.edad)
    });
};

const eliminar = (id) => {

    const estudiante = repository.obtenerPorId(id);

    if (!estudiante) {
        throw new Error("Estudiante no encontrado");
    }

    return repository.eliminar(id);
};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};