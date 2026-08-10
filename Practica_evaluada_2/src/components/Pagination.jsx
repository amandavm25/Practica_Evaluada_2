function Pagination({
    paginaActual,
    totalPaginas,
    cambiarPagina
}) {

    if (totalPaginas <= 1) {
        return null;
    }

    const paginas = [];

    for (
        let i = 1;
        i <= totalPaginas;
        i++
    ) {
        paginas.push(i);
    }

    return (
        <div className="pagination">

            <button
                disabled={paginaActual === 1}
                onClick={() =>
                    cambiarPagina(paginaActual - 1)
                }
            >
                ←
            </button>

            {paginas.map(pagina => (

                <button
                    key={pagina}
                    className={
                        pagina === paginaActual
                            ? "pagination-active"
                            : ""
                    }
                    onClick={() =>
                        cambiarPagina(pagina)
                    }
                >
                    {pagina}
                </button>

            ))}

            <button
                disabled={
                    paginaActual === totalPaginas
                }
                onClick={() =>
                    cambiarPagina(paginaActual + 1)
                }
            >
                →
            </button>

        </div>
    );
}

export default Pagination;