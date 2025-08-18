const RegistroPersona = () => {
    return (
        <div className="container_inputs">
            <form action="">
                <div>
                    <label>Nombres:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Apellidos:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Documento:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Fecha de nacimiento:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Ocupación:</label>
                    <input type="text"/>
                </div>
                <div>
                    <label>Rut:</label>
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

export default RegistroPersona;