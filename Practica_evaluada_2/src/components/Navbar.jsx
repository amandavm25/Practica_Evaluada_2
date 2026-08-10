function Navbar({ vistaActual, cambiarVista }) {
    return (
        <nav className="navbar">

            <div className="navbar-container">

                <div className="navbar-brand">
                    <div className="brand-icon">
                        E
                    </div>

                    <div>
                        <span className="brand-title">
                            EduAdmin
                        </span>

                        <span className="brand-subtitle">
                            Administración Académica
                        </span>
                    </div>
                </div>

                <div className="navbar-menu">

                    <button
                        className={
                            vistaActual === "dashboard"
                                ? "nav-item active"
                                : "nav-item"
                        }
                        onClick={() =>
                            cambiarVista("dashboard")
                        }
                    >
                        <span className="nav-icon">▦</span>
                        Dashboard
                    </button>

                    <button
                        className={
                            vistaActual === "estudiantes"
                                ? "nav-item active"
                                : "nav-item"
                        }
                        onClick={() =>
                            cambiarVista("estudiantes")
                        }
                    >
                        <span className="nav-icon">♙</span>
                        Estudiantes
                    </button>

                </div>

                <div className="navbar-user">
                    <div className="user-avatar">
                        AD
                    </div>

                    <div className="user-info">
                        <strong>
                            Administrador
                        </strong>

                        <span>
                            Sistema
                        </span>
                    </div>
                </div>

            </div>

        </nav>
    );
}

export default Navbar;