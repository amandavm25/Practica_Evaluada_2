import { useEffect, useState } from "react";

import EstudianteForm from "./components/EstudianteForm";
import EstudianteList from "./components/EstudianteList";

import {
    obtenerEstudiantes,
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
} from "./services/estudianteService";

import "./App.css";

function App() {

    const [estudiantes, setEstudiantes] =
        useState([]);

    const [estudianteEditar, setEstudianteEditar] =
        useState(null);

    const [cargando, setCargando] =
        useState(true);

    const [error, setError] =
        useState("");

    const cargarEstudiantes = async () => {

        try {

            setCargando(true);

            const data =
                await obtenerEstudiantes();

            setEstudiantes(data);

            setError("");

        } catch (error) {

            setError(error.message);

        } finally {

            setCargando(false);
        }
    };

    useEffect(() => {
        cargarEstudiantes();
    }, []);

    const guardarEstudiante = async (estudiante) => {

        try {

            if (estudianteEditar) {

                await actualizarEstudiante(
                    estudianteEditar.id,
                    estudiante
                );

                setEstudianteEditar(null);

            } else {

                await crearEstudiante(estudiante);
            }

            await cargarEstudiantes();

        } catch (error) {

            alert(error.message);
        }
    };

    const editarEstudiante = (estudiante) => {

        setEstudianteEditar(estudiante);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const eliminar = async (id) => {

        const confirmar =
            window.confirm(
                "¿Está seguro de eliminar este estudiante?"
            );

        if (!confirmar) {
            return;
        }

        try {

            await eliminarEstudiante(id);

            await cargarEstudiantes();

        } catch (error) {

            alert(error.message);
        }
    };

    const cancelarEdicion = () => {
        setEstudianteEditar(null);
    };

    return (

        <div className="app">

            <header className="header">

                <div>
                    <h1>
                        Administración de Estudiantes
                    </h1>

                    <p>
                        Sistema CRUD de estudiantes
                    </p>
                </div>

            </header>

            <main className="container">

                <EstudianteForm
                    estudianteEditar={estudianteEditar}
                    onGuardar={guardarEstudiante}
                    onCancelar={cancelarEdicion}
                />

                <section className="students-section">

                    <div className="section-header">

                        <h2>
                            Estudiantes registrados
                        </h2>

                        <span className="counter">
                            {estudiantes.length} estudiantes
                        </span>

                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    {cargando ? (

                        <div className="loading">
                            Cargando estudiantes...
                        </div>

                    ) : (

                        <EstudianteList
                            estudiantes={estudiantes}
                            onEditar={editarEstudiante}
                            onEliminar={eliminar}
                        />

                    )}

                </section>

            </main>

        </div>
    );
}

export default App;