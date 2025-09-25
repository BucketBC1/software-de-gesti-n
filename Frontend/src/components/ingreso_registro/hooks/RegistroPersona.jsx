import { UseRegistroPersona } from './UseRegistroPersona.jsx';

const RegistroPersona = () => {

    const{
        correo,
        setCorreo,
        password,
        setPassword,
        nombres,
        setNombres,
        apellidos,
        setApellidos,
        tipo_documento,
        setTipo_documento,
        documento,
        setDocumento,
        fecha_nacimiento,
        setFecha_nacimiento,
        handleSubmit
    } = UseRegistroPersona();


    return (
        <div className="container_inputs">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombres:</label>
                    <input 
                        type="text"
                        value={nombres}
                        onChange={(e) => setNombres(e.target.value)}
                    />
                </div>

                <div>
                    <label>Apellidos:</label>
                    <input 
                        type="text"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="">Tipo de documento:</label>
                    <select
                        value={tipo_documento}
                        onChange={(e) => setTipo_documento(e.target.value)}
                    >
                        <option disabled value="">Cedula de ciudadania</option>
                        <option value="Cedula de ciudadania">Cedula de ciudadania</option>
                        <option value="Tarjeta de identidad">Tarjeta de identidad</option>
                        <option value="Identificación extranjera">Identificación extranjera</option>
                    </select>
                </div>

                <div>
                    <label>N° de documento:</label>
                    <input 
                        type="text"
                        value={documento}
                        onChange={(e) => setDocumento(e.target.value)}
                    />
                </div>

                <div>
                    <label>Fecha de nacimiento:</label>
                    <input 
                        type="date"
                        value={fecha_nacimiento}
                        onChange={(e) => setFecha_nacimiento(e.target.value)}
                    />
                </div>

                <div>
                    <label>Ocupación:</label>
                    <input 
                        type="text"
                    />
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

export default RegistroPersona;