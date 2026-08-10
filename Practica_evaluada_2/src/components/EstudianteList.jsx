import { useEffect, useMemo, useState } from "react";
import Pagination from "./Pagination";

const REGISTROS_POR_PAGINA = 5;

function EstudianteList({
    estudiantes,
    onEditar,
    onEliminar
}) {

    const [busqueda, setBusqueda] =
        useState("");

    const [carreraFiltro, setCarreraFiltro] =
        useState("");

    const [edadFiltro, setEdadFiltro] =
        useState("");

    const [paginaActual, setPaginaActual] =
        useState(1);

    const carreras = useMemo(() => {

        return [
            ...new Set(
                estudiantes.map(
                    estudiante => estudiante.carrera
                )
            )
        ];

    }, [estudiantes]);

    const estudiantesFiltrados = useMemo(() => {

        const texto =
            busqueda.toLowerCase().trim();

        return estudiantes.filter(estudiante => {

            const coincideBusqueda =
                !texto ||
                estudiante.nombre
                    .toLowerCase()
                    .includes(texto) ||
                estudiante.apellido
                    .toLowerCase()
                    .includes(texto) ||
                estudiante.cedula
                    .toLowerCase()
                    .includes(texto) ||
                estudiante.correo
                    .toLowerCase()
                    .includes(texto);

            const coincideCarrera =
                !carreraFiltro ||
                estudiante.carrera === carreraFiltro;

            let coincideEdad = true;

            if (edadFiltro === "mayor") {
                coincideEdad =
                    estudiante.edad >= 18;
            }

            if (edadFiltro === "menor") {
                coincideEdad =
                    estudiante.edad < 18;
            }

            return (
                coincideBusqueda &&
                coincideCarrera &&
                coincideEdad
            );
        });

    }, [
        estudiantes,
        busqueda,
        carreraFiltro,
        edadFiltro
    ]);

    const totalPaginas = Math.ceil(
        estudiantesFiltrados.length /
        REGISTROS_POR_PAGINA
    );

    useEffect(() => {

        if (
            paginaActual > totalPaginas &&
            totalPaginas > 0
        ) {
            setPaginaActual(totalPaginas);
        }

    }, [paginaActual, totalPaginas]);

    const estudiantesPagina =
        estudiantesFiltrados.slice(
            (paginaActual - 1) *
                REGISTROS_POR_PAGINA,
            paginaActual *
                REGISTROS_POR_PAGINA
        );

    const cambiarBusqueda = (valor) => {
        setBusqueda(valor);
        setPaginaActual(1);
    };

    const cambiarCarrera = (valor) => {
        setCarreraFiltro(valor);
        setPaginaActual(1);
    };

    const cambiarEdad = (valor) => {
        setEdadFiltro(valor);
        setPaginaActual(1);
    };

    const limpiarFiltros = () => {

        setBusqueda("");
        setCarreraFiltro("");
        setEdadFiltro("");
        setPaginaActual(1);
    };

    return (
        <div>

            <div className="filters">

                <div className="search-container">

                    <span className="search-icon">
                        ⌕
                    </span>

                    <input
                        type="text"
                        placeholder="Buscar por nombre, cédula o correo..."
                        value={busqueda}
                        onChange={e =>
                            cambiarBusqueda(
                                e.target.value
                            )
                        }
                    />

                </div>

                <select
                    value={carreraFiltro}
                    onChange={e =>
                        cambiarCarrera(
                            e.target.value
                        )
                    }
                >
                    <option value="">
                        Todas las carreras
                    </option>

                    {carreras.map(carrera => (
                        <option
                            key={carrera}
                            value={carrera}
                        >
                            {carrera}
                        </option>
                    ))}

                </select>

                <select
                    value={edadFiltro}
                    onChange={e =>
                        cambiarEdad(
                            e.target.value
                        )
                    }
                >
                    <option value="">
                        Todas las edades
                    </option>

                    <option value="mayor">
                        Mayores de edad
                    </option>

                    <option value="menor">
                        Menores de edad
                    </option>

                </select>

                {(busqueda ||
                    carreraFiltro ||
                    edadFiltro) && (

                    <button
                        className="clear-button"
                        onClick={limpiarFiltros}
                    >
                        Limpiar
                    </button>

                )}

            </div>

            <div className="results-info">

                <span>
                    Mostrando{" "}
                    <strong>
                        {estudiantesFiltrados.length}
                    </strong>{" "}
                    de{" "}
                    <strong>
                        {estudiantes.length}
                    </strong>{" "}
                    estudiantes
                </span>

            </div>

            {estudiantesPagina.length === 0 ? (

                <div className="empty">
                    No se encontraron estudiantes.
                </div>

            ) : (

                <div className="table-container">

                    <table>

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Estudiante</th>
                                <th>Cédula</th>
                                <th>Correo</th>
                                <th>Carrera</th>
                                <th>Edad</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>

                            {estudiantesPagina.map(
                                estudiante => (

                                    <tr
                                        key={
                                            estudiante.id
                                        }
                                    >

                                        <td>
                                            <span className="id-badge">
                                                #{estudiante.id}
                                            </span>
                                        </td>

                                        <td>

                                            <div className="table-student">

                                                <div className="student-avatar small">
                                                    {estudiante.nombre
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>

                                                <div>
                                                    <strong>
                                                        {
                                                            estudiante.nombre
                                                        }{" "}
                                                        {
                                                            estudiante.apellido
                                                        }
                                                    </strong>
                                                </div>

                                            </div>

                                        </td>

                                        <td>
                                            {
                                                estudiante.cedula
                                            }
                                        </td>

                                        <td>
                                            {
                                                estudiante.correo
                                            }
                                        </td>

                                        <td>
                                            {
                                                estudiante.carrera
                                            }
                                        </td>

                                        <td>
                                            {
                                                estudiante.edad
                                            }
                                        </td>

                                        <td>

                                            <div className="actions">

                                                <button
                                                    className="edit-button"
                                                    onClick={() =>
                                                        onEditar(
                                                            estudiante
                                                        )
                                                    }
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    className="delete-button"
                                                    onClick={() =>
                                                        onEliminar(
                                                            estudiante.id
                                                        )
                                                    }
                                                >
                                                    Eliminar
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )}

                        </tbody>

                    </table>

                </div>
            )}

            <Pagination
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                cambiarPagina={setPaginaActual}
            />

        </div>
    );
}

export default EstudianteList;