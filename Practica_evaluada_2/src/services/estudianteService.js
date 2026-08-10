const API_URL = "http://localhost:3000/api/estudiantes";

export const obtenerEstudiantes = async () => {

    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Error al obtener los estudiantes");
    }

    return await response.json();
};

export const obtenerEstudiante = async (id) => {

    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error("Estudiante no encontrado");
    }

    return await response.json();
};

export const crearEstudiante = async (estudiante) => {

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(estudiante)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensaje);
    }

    return data;
};

export const actualizarEstudiante = async (id, estudiante) => {

    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(estudiante)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensaje);
    }

    return data;
};

export const eliminarEstudiante = async (id) => {

    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.mensaje);
    }

    return data;
};