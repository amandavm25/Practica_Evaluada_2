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

    validarEstudiante(datos);

    const estudiantes =
        repository.obtenerTodos();

    const cedulaExiste =
        estudiantes.some(
            estudiante =>
                estudiante.cedula ===
                datos.cedula
        );

    if (cedulaExiste) {

        const error = new Error(
            "La cédula ya está registrada"
        );

        error.statusCode = 409;

        throw error;
    }

    return repository.crear({
        cedula: datos.cedula.trim(),
        nombre: datos.nombre.trim(),
        apellido: datos.apellido.trim(),
        correo: datos.correo.trim().toLowerCase(),
        carrera: datos.carrera.trim(),
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

const validarEstudiante = (datos) => {

    const errores = {};

    const cedulaRegex =
        /^[1-9]-\d{4}-\d{4}$/;

    const correoRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const nombreRegex =
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if (!datos.cedula) {

        errores.cedula =
            "La cédula es obligatoria";

    } else if (
        !cedulaRegex.test(datos.cedula)
    ) {

        errores.cedula =
            "Formato de cédula inválido";
    }

    if (!datos.nombre) {

        errores.nombre =
            "El nombre es obligatorio";

    } else if (
        datos.nombre.length < 2 ||
        !nombreRegex.test(datos.nombre)
    ) {

        errores.nombre =
            "El nombre no es válido";
    }

    if (!datos.apellido) {

        errores.apellido =
            "El apellido es obligatorio";

    } else if (
        datos.apellido.length < 2 ||
        !nombreRegex.test(datos.apellido)
    ) {

        errores.apellido =
            "El apellido no es válido";
    }

    if (!datos.correo) {

        errores.correo =
            "El correo es obligatorio";

    } else if (
        !correoRegex.test(datos.correo)
    ) {

        errores.correo =
            "El correo no es válido";
    }

    if (!datos.carrera) {

        errores.carrera =
            "La carrera es obligatoria";
    }

    const edad = Number(datos.edad);

    if (!datos.edad) {

        errores.edad =
            "La edad es obligatoria";

    } else if (
        edad < 15 ||
        edad > 100
    ) {

        errores.edad =
            "La edad debe estar entre 15 y 100";
    }

    if (Object.keys(errores).length > 0) {

        const error = new Error(
            "Los datos proporcionados no son válidos"
        );

        error.statusCode = 400;
        error.errors = errores;

        throw error;
    }
};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};