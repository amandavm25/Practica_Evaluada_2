import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import EstudianteForm from "./components/EstudianteForm";
import EstudianteList from "./components/EstudianteList";
import Toast from "./components/Toast";

import {
    obtenerEstudiantes,
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
} from "./services/estudianteService";

import "./App.css";

function App() {

    const [vistaActual, setVistaActual] =
        useState("dashboard");

    const [estudiantes, setEstudiantes] =
        useState([]);

    const [estudianteEditar, setEstudianteEditar] =
        useState(null);

    const [cargando, setCargando] =
        useState(true);

    const [toast, setToast] = useState({
        mensaje: "",
        tipo: "success"
    });

    const mostrarToast = (
        mensaje,
        tipo = "success"
    ) => {

        setToast({
            mensaje,
            tipo
        });

        setTimeout(() => {

            setToast({
                mensaje: "",
                tipo: "success"
            });

        }, 4000);
    };

    const cargarEstudiantes = async () => {

        try {

            setCargando(true);

            const data =
                await obtenerEstudiantes();

            setEstudiantes(data);

        } catch (error) {

            mostrarToast(
                error.message,
                "error"
            );

        } finally {

            setCargando(false);
        }
    };

    useEffect(() => {
        cargarEstudiantes();
    }, []);

    const guardarEstudiante = async (
        estudiante
    ) => {

        try {

            if (estudianteEditar) {

                await actualizarEstudiante(
                    estudianteEditar.id,
                    estudiante
                );

                setEstudianteEditar(null);

                mostrarToast(
                    "El estudiante fue actualizado correctamente.",
                    "success"
                );

            } else {

                await crearEstudiante(
                    estudiante
                );

                mostrarToast(
                    "El estudiante fue registrado correctamente.",
                    "success"
                );
            }

            await cargarEstudiantes();

        } catch (error) {

            mostrarToast(
                error.message,
                "error"
            );
        }
    };

    const editarEstudiante = (
        estudiante
    ) => {

        setEstudianteEditar(
            estudiante
        );

        setVistaActual(
            "estudiantes"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const eliminar = async (id) => {

        try {

            await eliminarEstudiante(id);

            await cargarEstudiantes();

            mostrarToast(
                "El estudiante fue eliminado correctamente.",
                "success"
            );

        } catch (error) {

            mostrarToast(
                error.message,
                "error"
            );
        }
    };

    const cancelarEdicion = () => {
        setEstudianteEditar(null);
    };

    const cambiarVista = (vista) => {

        setVistaActual(vista);

        if (vista === "dashboard") {
            setEstudianteEditar(null);
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (

        <div className="app">

            <Navbar
                vistaActual={vistaActual}
                cambiarVista={cambiarVista}
            />

            <main className="main-content">

                {cargando ? (

                    <div className="loading-page">
                        Cargando información...
                    </div>

                ) : vistaActual === "dashboard" ? (

                    <Dashboard
                        estudiantes={estudiantes}
                        cambiarVista={cambiarVista}
                    />

                ) : (

                    <div className="students-page">

                        <div className="page-header">

                            <div>
                                <h1>
                                    Estudiantes
                                </h1>

                                <p>
                                    Administración de registros académicos
                                </p>
                            </div>

                            {!estudianteEditar && (
                                <button
                                    className="primary-button"
                                    onClick={() =>
                                        document
                                            .getElementById(
                                                "student-form"
                                            )
                                            ?.scrollIntoView({
                                                behavior:
                                                    "smooth"
                                            })
                                    }
                                >
                                    + Nuevo estudiante
                                </button>
                            )}

                        </div>

                        <div
                            id="student-form"
                            className="dashboard-card"
                        >

                            <EstudianteForm
                                estudianteEditar={
                                    estudianteEditar
                                }
                                onGuardar={
                                    guardarEstudiante
                                }
                                onCancelar={
                                    cancelarEdicion
                                }
                            />

                        </div>

                        <div className="dashboard-card">

                            <div className="card-header">

                                <div>
                                    <h2>
                                        Lista de estudiantes
                                    </h2>

                                    <p>
                                        Administre los registros existentes
                                    </p>
                                </div>

                            </div>

                            <EstudianteList
                                estudiantes={
                                    estudiantes
                                }
                                onEditar={
                                    editarEstudiante
                                }
                                onEliminar={
                                    eliminar
                                }
                            />

                        </div>

                    </div>

                )}

            </main>

            <Toast
                mensaje={toast.mensaje}
                tipo={toast.tipo}
                cerrar={() =>
                    setToast({
                        mensaje: "",
                        tipo: "success"
                    })
                }
            />

        </div>
    );
}

export default App;