const LoginEmpresa = () => {
    return (
        <div className="container_inputs">
            <div>
                <label>Nit:</label>
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

export default LoginEmpresa;
