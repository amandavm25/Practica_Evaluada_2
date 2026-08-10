function EstudianteList({
    estudiantes,
    onEditar,
    onEliminar
}) {

    if (estudiantes.length === 0) {
        return (
            <div className="empty">
                No existen estudiantes registrados.
            </div>
        );
    }

    return (
        <div className="table-container">

            <table>

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cédula</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Carrera</th>
                        <th>Edad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>

                    {estudiantes.map(estudiante => (

                        <tr key={estudiante.id}>

                            <td>
                                {estudiante.id}
                            </td>

                            <td>
                                {estudiante.cedula}
                            </td>

                            <td>
                                {estudiante.nombre}{" "}
                                {estudiante.apellido}
                            </td>

                            <td>
                                {estudiante.correo}
                            </td>

                            <td>
                                {estudiante.carrera}
                            </td>

                            <td>
                                {estudiante.edad}
                            </td>

                            <td className="actions">

                                <button
                                    className="edit-button"
                                    onClick={() =>
                                        onEditar(estudiante)
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

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default EstudianteList;