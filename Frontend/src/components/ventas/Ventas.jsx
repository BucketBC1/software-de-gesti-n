import { useEffect, useState } from 'react';
import './styles/Ventas.css';
import MostrarCajas from './hooks/MostrarCajas';
import AgregarCajaModal from './AgregarCajaModal';


function Ventas() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cajas, setCajas] = useState([]);

  const reloadData = async () => {
    const c = await fetch('http://localhost:5000/cajas').then(res => res.json());
    setCajas(c);
  }

  useEffect(() => {
    reloadData();
  }, []);



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
        <ul className='cajasList'>
          <MostrarCajas cajas={cajas}/>
        </ul>
      </div>

    </div>
  );
}

export default Ventas;