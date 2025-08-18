const RegistroEmpresa = () => {
    return (
        <div className="container_inputs">
            <form action="">
                <div>
                    <label>Razón social:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>nit:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Tipo de sociedad:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Representante:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Actividad economica:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Teléfono:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Correo:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input type="text"/>
                </div>
                <div>
                    <button type="submit">Registrase</button>
                </div>
            </form>
        </div>
    )
}

export default RegistroEmpresa;