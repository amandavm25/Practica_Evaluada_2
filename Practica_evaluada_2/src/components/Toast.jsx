function Toast({ mensaje, tipo, cerrar }) {

    if (!mensaje) {
        return null;
    }

    return (
        <div className={`toast toast-${tipo}`}>

            <div className="toast-icon">

                {tipo === "success" && "✓"}

                {tipo === "error" && "!"}

                {tipo === "warning" && "!"}

            </div>

            <div className="toast-content">
                <strong>
                    {tipo === "success"
                        ? "Operación exitosa"
                        : tipo === "error"
                            ? "Error"
                            : "Advertencia"}
                </strong>

                <span>
                    {mensaje}
                </span>
            </div>

            <button
                className="toast-close"
                onClick={cerrar}
            >
                ×
            </button>

        </div>
    );
}

export default Toast;