let estudiantes = [
    {
        id: 1,
        cedula: "1-1234-5678",
        nombre: "Daniel",
        apellido: "Méndez",
        correo: "daniel.mendez@email.com",
        carrera: "Ingeniería en Sistemas",
        edad: 22
    },
    {
        id: 2,
        cedula: "2-0987-6543",
        nombre: "Mariana",
        apellido: "Jiménez",
        correo: "mariana.jimenez@email.com",
        carrera: "Ingeniería Industrial",
        edad: 24
    },

    {
        id: 3,
        cedula: "3-1122-3344",
        nombre: "Gerardo",
        apellido: "Solano",
        correo: "gerardo.solano@email.com",
        carrera: "Administración de Negocios",
        edad: 26
    },
    {
        id: 4,
        cedula: "4-5566-7788",
        nombre: "Valeria",
        apellido: "Quesada",
        correo: "valeria.quesada@email.com",
        carrera: "Ingeniería en Sistemas",
        edad: 21
    },
    {
        id: 5,
        cedula: "1-9988-7766",
        nombre: "Esteban",
        apellido: "Chinchilla",
        correo: "esteban.chinchilla@email.com",
        carrera: "Ingeniería Civil",
        edad: 23
    },
    {
        id: 6,
        cedula: "2-4455-6677",
        nombre: "Priscilla",
        apellido: "Monge",
        correo: "priscilla.monge@email.com",
        carrera: "Recursos Humanos",
        edad: 25
    },
    {
        id: 7,
        cedula: "5-1020-3040",
        nombre: "Andrés",
        apellido: "Ramírez",
        correo: "andres.ramirez@email.com",
        carrera: "Arquitectura",
        edad: 22
    },
    {
        id: 8,
        cedula: "6-7788-9900",
        nombre: "Natalia",
        apellido: "Acuña",
        correo: "natalia.acuna@email.com",
        carrera: "Derecho",
        edad: 28
    }
];

let siguienteId = 9;

const obtenerTodos = () => {
    return estudiantes;
};

const obtenerPorId = (id) => {
    return estudiantes.find(estudiante => estudiante.id === Number(id));
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
    const numericId = Number(id);
    const indice = estudiantes.findIndex(
        estudiante => estudiante.id === numericId
    );

    if (indice === -1) {
        return null;
    }

    estudiantes[indice] = {
        ...estudiantes[indice],
        ...datos,
        id: numericId   
    };

    return estudiantes[indice];
};

const eliminar = (id) => {
    const numericId = Number(id);
    const indice = estudiantes.findIndex(
        estudiante => estudiante.id === numericId
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