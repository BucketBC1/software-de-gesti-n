const LoginPersona = () => {
    return (
        <div className="container_inputs">
            <div>
                <label>Documento:</label>
                <input type="text"/>
            </div>
            <div>
                <label>Contraseña:</label>
                <input type="text"/>
            </div>
            <div>
                <button type="submit">Ingresar</button>
            </div>
        </div>
    )
}

export default LoginPersona;