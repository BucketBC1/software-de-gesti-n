import { UseRegistroEmpresa } from "./UseRegistroEmpresa.jsx";

const RegistroEmpresa = () => {

    const {
        handleSubmit,
        correo,
        setCorreo,
        direccion,
        setDireccion,
        password,
        setPassword,
        razon_social,
        setRazon_social,
        nit,
        setNit,
        tipo_sociedad,
        setTipo_sociedad,
        representante_legal,
        setRepresentante_legal,
        actividad_economica,
        setActividad_economica
    } = UseRegistroEmpresa();

    return (
        <div className="container_inputs">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Razón social:</label>
                    <input  
                        type="text"
                        value={razon_social}
                        onChange={(e) => setRazon_social(e.target.value)}
                    />
                </div>

                <div>
                    <label>nit:</label>
                    <input 
                        type="text"
                        value={nit}
                        onChange={(e) => setNit(e.target.value)}
                    />
                </div>

                <div>
                    <label>Tipo de sociedad:</label>
                    <input 
                        type="text"
                        value={tipo_sociedad}
                        onChange={(e) => setTipo_sociedad(e.target.value)}
                    />
                </div>

                <div>
                    <label>Representante:</label>
                    <input 
                        type="text"
                        value={representante_legal}
                        onChange={(e) => setRepresentante_legal(e.target.value)}
                    />
                </div>

                <div>
                    <label>Actividad economica:</label>
                    <input 
                        type="text"
                        value={actividad_economica}
                        onChange={(e) => setActividad_economica(e.target.value)}
                    />
                </div>

                <div>
                    <label>Teléfono:</label>
                    <input type="text"/>
                </div>

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
                    <button type="submit">Registrase</button>
                </div>
            </form>
        </div>
    )
}

export default RegistroEmpresa;