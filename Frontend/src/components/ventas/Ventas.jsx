import { useEffect, useState } from 'react';
import './styles/Ventas.css';
import MostrarCajas from './hooks/MostrarCajas';
import AgregarCajaModal from './AgregarCajaModal';
/* import { useAuth } from '../../context/AuthContext.jsx'; */


function Ventas() {
  /* const { token } = useAuth(); */

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cajas, setCajas] = useState([]);

  const reloadData = async () => {
    const c = await fetch('http://localhost:5000/cajas')
      .then(res => res.json());
      setCajas(c);
  }

  useEffect(() => {
    reloadData();
  }, []);

  /* const reloadData = async () => {
    try {
      console.log("Token en Ventas:", token);
      const res = await fetch('http://localhost:5000/cajas', {
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        }
      });

      if(!res.ok){
        throw new Error(`Error ${res.status}: No autorizado o fallo en la petición`);
      }

      const data = await res.json();
      setCajas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando cajas:", error);
      setCajas([]);

    }
  };

  useEffect(() => {
    reloadData();
    if (token) {
      reloadData();
    }
  }, [token]); */



  return (
    <div className='ventas'>
      {/* <nav className='contenidoVentas'>
        <a href="#Ventas">
          Ventas

        </a>
        <a href="#Ventas">Cajas</a>
        <a href="#Historial">Historial</a>
      </nav> */}

      <div className='botonesVentas'>

        <button
          onClick={() => setIsModalOpen(true)}
          className='btn btn-primary'>
            Agregar caja
        </button>
      </div>

      <AgregarCajaModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          reloadData();
        }}
      />

      <div className='content'>
        <h2 className='title2'>Ventas</h2>
        <ul className='cajasList'>
          <MostrarCajas cajas={cajas}/>
        </ul>
      </div>

    </div>
  );
}

export default Ventas;