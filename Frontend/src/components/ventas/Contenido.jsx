import Ordenes from './Ordenes';
import Historial from './Historial';
import { useEffect, useState } from 'react';

function Contenido() {

    const [contenido, setContenido] = useState(window.location.hash || '#Ordenes');

    useEffect(() => {
        const handleHashChange = () => {
            setContenido(window.location.hash || '#Ordenes');
        };

        window.addEventListener('hashchange', handleHashChange);

        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return(
        <div className='ventas'>
            <nav className='contenidoVentas'>
                <a href="#Ordenes">Ordenes</a>
                <a href="#Historial">Historial</a>
            </nav>
            {/* <div className='botonesVentas'>
                <button
                    className='btn btn-primary'>
                    Crear descuento
                </button>
            </div> */}
            {contenido === '#Ordenes' && <Ordenes />}
            {contenido === '#Historial' && <Historial/>}
        </div>
    )

}

export default Contenido;