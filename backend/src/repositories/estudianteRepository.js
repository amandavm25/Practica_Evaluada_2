let estudiantes = [
    {
        id: 1,
        cedula: "1-1111-1111",
        nombre: "Juan",
        apellido: "Pérez",
        correo: "juan.perez@email.com",
        carrera: "Ingeniería en Sistemas",
        edad: 21
    },
    {
        id: 2,
        cedula: "1-2222-2222",
        nombre: "María",
        apellido: "Gómez",
        correo: "maria.gomez@email.com",
        carrera: "Administración",
        edad: 23
    }
];

let siguienteId = 3;

const obtenerTodos = () => {
    return estudiantes;
};

const obtenerPorId = (id) => {
    return estudiantes.find(estudiante => estudiante.id === id);
};

const crear = (estudiante) => {
    const nuevoEstudiante = {
        id: siguienteId++,
        ...estudiante
    };

    estudiantes.push(nuevoEstudiante);

    return nuevoEstudiante;
};

const actualizar = (id, datos) => {
    const indice = estudiantes.findIndex(
        estudiante => estudiante.id === id
    );

    if (indice === -1) {
        return null;
    }

    estudiantes[indice] = {
        ...estudiantes[indice],
        ...datos,
        id
    };

    return estudiantes[indice];
};

const eliminar = (id) => {
    const indice = estudiantes.findIndex(
        estudiante => estudiante.id === id
    );

    if (indice === -1) {
        return false;
    }

    estudiantes.splice(indice, 1);

    return true;
};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};