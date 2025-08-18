
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layouts/Sidebar.jsx';
/* import Buscador from './components/layouts/Buscador.jsx'; */

import Ingreso from './components/ingreso_registro/Ingreso.jsx';
import Registro from './components/ingreso_registro/Registro.jsx';

import Inicio from './components/inicio/Inicio.jsx';
import Tienda from './components/tienda/Tienda.jsx';
import Ventas from './components/ventas/Ventas.jsx';
import Contenido from './components/ventas/Contenido.jsx';
import Compras from './components/compras/Compras.jsx';
import Inventario from './components/inventario/Inventario.jsx';
import Productos from './components/inventario/Productos.jsx';
import Contactos from './components/contactos/Contactos.jsx';



function App() {
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  if(!isLoggedIn) {
    return (
      <div className='App'>
        <Router>
          <Routes>
            <Route path="/ingreso" element={<Ingreso/>}/>
            <Route path="/registro" element={<Registro/>}/>
          </Routes>
        </Router>
      </div>
    );
  }

  return (
    <div className='App'> 
    <Router>
      
      <Sidebar/>
      
      <div className='main-content'>
        {/* <Buscador/> */}
        <div className='routes-content'>
          <Routes>
            <Route exact path="/" element={<Inicio/>}/>
            <Route path="/tienda" element={<Tienda/>}/>
            <Route path="/ventas" element={<Ventas/>}/>
                <Route path="/contenido/:idCaja" element={<Contenido/>}/>


            <Route path="/compras" element={<Compras/>}/>
            <Route path="/inventario" element={<Inventario/>}/>
                <Route path="/productos/:categoriaId" element={<Productos/>}/>
            <Route path="/contactos" element={<Contactos/>}/>
          </Routes>
        </div>
      </div>
    </Router>
    </div>
  )
}

export default App
