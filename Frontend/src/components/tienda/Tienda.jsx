import './styles/Tienda.css';
import Inicio from './Inicio.jsx';
import Categorias from './Categorias.jsx';
import { useEffect, useState } from 'react';

function Tienda() {

    const [contenido, setContenido] = useState(window.location.hash || '#Inicio');
    
        useEffect(() => {
            const handleHashChange = () => {
                setContenido(window.location.hash || '#Inicio');
            };
    
            window.addEventListener('hashchange', handleHashChange);
    
            return () => window.removeEventListener('hashchange', handleHashChange);
        }, []);

    return (
        <div className="tienda">
            <nav className='contenidoVentas'>
                <a href="#Inicio">Inicio</a>
                <a href="#Categorias">Categorías</a>
            </nav> 
            <div className="content">
                <h2 className='title2'>Tienda</h2>
                {contenido === '#Inicio' && <Inicio/>}
                {contenido === '#Categorias' && <Categorias/>}

            </div>
        </div>
    )
}
export default Tienda;