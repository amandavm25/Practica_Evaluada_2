import { useEffect, useState } from "react";

const estudianteInicial = {
    cedula: "",
    nombre: "",
    apellido: "",
    correo: "",
    carrera: "",
    edad: ""
};

function EstudianteForm({
    estudianteEditar,
    onGuardar,
    onCancelar
}) {

    const [formulario, setFormulario] =
        useState(estudianteInicial);

    const [errores, setErrores] =
        useState({});

    useEffect(() => {

        if (estudianteEditar) {
            setFormulario(estudianteEditar);
        } else {
            setFormulario(estudianteInicial);
        }

        setErrores({});

    }, [estudianteEditar]);

    const manejarCambio = (e) => {

        const { name, value } = e.target;

        setFormulario({
            ...formulario,
            [name]: value
        });
    };

    const validar = () => {

        const nuevosErrores = {};

        if (!formulario.cedula.trim()) {
            nuevosErrores.cedula =
                "La cédula es obligatoria";
        }

        if (!formulario.nombre.trim()) {
            nuevosErrores.nombre =
                "El nombre es obligatorio";
        }

        if (!formulario.apellido.trim()) {
            nuevosErrores.apellido =
                "El apellido es obligatorio";
        }

        if (!formulario.correo.trim()) {
            nuevosErrores.correo =
                "El correo es obligatorio";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formulario.correo
            )
        ) {
            nuevosErrores.correo =
                "El correo no es válido";
        }

        if (!formulario.carrera.trim()) {
            nuevosErrores.carrera =
                "La carrera es obligatoria";
        }

        if (!formulario.edad) {
            nuevosErrores.edad =
                "La edad es obligatoria";
        } else if (
            formulario.edad < 15 ||
            formulario.edad > 100
        ) {
            nuevosErrores.edad =
                "La edad debe estar entre 15 y 100 años";
        }

        setErrores(nuevosErrores);

        return Object.keys(nuevosErrores).length === 0;
    };

    const manejarSubmit = (e) => {

        e.preventDefault();

        if (!validar()) {
            return;
        }

        onGuardar({
            ...formulario,
            edad: Number(formulario.edad)
        });
    };

    return (
        <form
            className="student-form"
            onSubmit={manejarSubmit}
        >

            <h2>
                {estudianteEditar
                    ? "Editar estudiante"
                    : "Nuevo estudiante"}
            </h2>

            <div className="form-grid">

                <div className="form-group">
                    <label>Cédula</label>

                    <input
                        type="text"
                        name="cedula"
                        value={formulario.cedula}
                        onChange={manejarCambio}
                        placeholder="1-1111-1111"
                    />

                    {errores.cedula && (
                        <span className="error">
                            {errores.cedula}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label>Nombre</label>

                    <input
                        type="text"
                        name="nombre"
                        value={formulario.nombre}
                        onChange={manejarCambio}
                    />

                    {errores.nombre && (
                        <span className="error">
                            {errores.nombre}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label>Apellido</label>

                    <input
                        type="text"
                        name="apellido"
                        value={formulario.apellido}
                        onChange={manejarCambio}
                    />

                    {errores.apellido && (
                        <span className="error">
                            {errores.apellido}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label>Correo</label>

                    <input
                        type="email"
                        name="correo"
                        value={formulario.correo}
                        onChange={manejarCambio}
                    />

                    {errores.correo && (
                        <span className="error">
                            {errores.correo}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label>Carrera</label>

                    <input
                        type="text"
                        name="carrera"
                        value={formulario.carrera}
                        onChange={manejarCambio}
                    />

                    {errores.carrera && (
                        <span className="error">
                            {errores.carrera}
                        </span>
                    )}
                </div>

                <div className="form-group">
                    <label>Edad</label>

                    <input
                        type="number"
                        name="edad"
                        value={formulario.edad}
                        onChange={manejarCambio}
                    />

                    {errores.edad && (
                        <span className="error">
                            {errores.edad}
                        </span>
                    )}
                </div>

            </div>

            <div className="form-buttons">

                <button type="submit">
                    {estudianteEditar
                        ? "Actualizar"
                        : "Guardar"}
                </button>

                {estudianteEditar && (
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={onCancelar}
                    >
                        Cancelar
                    </button>
                )}

            </div>

        </form>
    );
}

export default EstudianteForm;