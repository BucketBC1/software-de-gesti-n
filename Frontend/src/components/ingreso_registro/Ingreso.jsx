import LoginPersona from "./hooks/LoginPersona.jsx";
import LoginEmpresa from "./hooks/LoginEmpresa.jsx";
import './styles/Ingreso_Registro.css';
import './hooks/styles/inputs.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Ingreso = () => {

    const [contenido, setContenido] = useState(window.location.hash || '#persona');
    
    useEffect(() => {
        const handleHashChange = () => {
            setContenido(window.location.hash || '#persona');
        };

        window.addEventListener('hashchange', handleHashChange);
        
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return (
        <div className="container">
            <div className="tipo_usuario">
                <div className="persona usuario">
                    <box-icon name='user' size='50px'></box-icon>
                    <a href="#persona">Persona</a>
                </div>
                <div className="empresa usuario">
                    <box-icon name='buildings' size='50px'></box-icon>
                    <a href="#empresa">Empresa</a>
                </div>

            </div>
            <div className="inputs">
                {contenido === '#persona' && <LoginPersona/>}
                {contenido === '#empresa' && <LoginEmpresa/>}
            </div>
            <Link to ="/registro">
                <button className="btn">registrarse</button>
            </Link>
        </div>
    )
}

export default Ingreso;