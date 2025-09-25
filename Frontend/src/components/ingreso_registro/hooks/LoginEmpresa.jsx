import { handleLogin } from "./HandleLogin.jsx";


const LoginEmpresa = () => {

    const {correo, setCorreo, password, setPassword, handleLoginSubmit} = handleLogin();
    
    return (
        <div className="container_inputs">
            <form action="" onSubmit={handleLoginSubmit}>
                <div>
                    <label>Correo:</label>
                    <input 
                        type="text"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input 
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">Ingresar</button>
                </div>
            </form>
        </div>  
    )
}

export default LoginEmpresa;
