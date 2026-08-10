function Dashboard({ estudiantes, cambiarVista }) {

    const totalEstudiantes = estudiantes.length;

    const mayoresEdad = estudiantes.filter(
        estudiante => estudiante.edad >= 18
    ).length;

    const menoresEdad = estudiantes.filter(
        estudiante => estudiante.edad < 18
    ).length;

    const carreras = new Set(
        estudiantes.map(estudiante => estudiante.carrera)
    ).size;

    const ultimosEstudiantes = [...estudiantes]
        .reverse()
        .slice(0, 5);

    return (
        <div className="dashboard">

            <div className="page-header">

                <div>
                    <h1>Dashboard</h1>

                    <p>
                        Resumen general de estudiantes
                    </p>
                </div>

                <button
                    className="primary-button"
                    onClick={() =>
                        cambiarVista("estudiantes")
                    }
                >
                    + Nuevo estudiante
                </button>

            </div>

            <div className="stats-grid">

                <div className="stat-card">
                    <div className="stat-icon blue">
                        👥
                    </div>

                    <div>
                        <span className="stat-label">
                            Total estudiantes
                        </span>

                        <strong>
                            {totalEstudiantes}
                        </strong>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon green">
                        ✓
                    </div>

                    <div>
                        <span className="stat-label">
                            Mayores de edad
                        </span>

                        <strong>
                            {mayoresEdad}
                        </strong>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon orange">
                        ◷
                    </div>

                    <div>
                        <span className="stat-label">
                            Menores de edad
                        </span>

                        <strong>
                            {menoresEdad}
                        </strong>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon purple">
                        ▤
                    </div>

                    <div>
                        <span className="stat-label">
                            Carreras
                        </span>

                        <strong>
                            {carreras}
                        </strong>
                    </div>
                </div>

            </div>

            <div className="dashboard-card">

                <div className="card-header">

                    <div>
                        <h2>
                            Estudiantes recientes
                        </h2>

                        <p>
                            Últimos registros agregados
                        </p>
                    </div>

                    <button
                        className="secondary-button"
                        onClick={() =>
                            cambiarVista("estudiantes")
                        }
                    >
                        Ver todos
                    </button>

                </div>

                {ultimosEstudiantes.length === 0 ? (

                    <div className="empty">
                        No hay estudiantes registrados.
                    </div>

                ) : (

                    <div className="recent-list">

                        {ultimosEstudiantes.map(
                            estudiante => (

                                <div
                                    className="recent-item"
                                    key={estudiante.id}
                                >

                                    <div className="student-avatar">
                                        {estudiante.nombre
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div className="recent-info">

                                        <strong>
                                            {estudiante.nombre}{" "}
                                            {estudiante.apellido}
                                        </strong>

                                        <span>
                                            {estudiante.carrera}
                                        </span>

                                    </div>

                                    <span className="student-age">
                                        {estudiante.edad} años
                                    </span>

                                </div>
                            )
                        )}

                    </div>
                )}

            </div>

        </div>
    );
}

export default Dashboard;