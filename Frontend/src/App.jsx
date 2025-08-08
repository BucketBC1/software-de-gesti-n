
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layouts/Sidebar.jsx';
import Buscador from './components/layouts/Buscador.jsx';

import Inicio from './components/inicio/Inicio.jsx';
import Tienda from './components/tienda/Tienda.jsx';
import Ventas from './components/ventas/Ventas.jsx';
    import Contenido from './components/ventas/Contenido.jsx';

import Compras from './components/compras/Compras.jsx';
import Inventario from './components/inventario/Inventario.jsx';
    import Productos from './components/inventario/Productos.jsx';

import Contactos from './components/contactos/Contactos.jsx';



function App() {
  return (
    <div className='App'> 
    <Router>
      <Sidebar/>
      
      <div className='main-content'>
        <Buscador/>
        <div className='routes-content'>
          <Routes>
            <Route exact path="/" element={<Inicio/>}/>
            <Route path="/Tienda" element={<Tienda/>}/>
            <Route path="/Ventas" element={<Ventas/>}/>
                <Route path="/Contenido/:idCaja" element={<Contenido/>}/>


            <Route path="/Compras" element={<Compras/>}/>
            <Route path="/Inventario" element={<Inventario/>}/>
                <Route path="/productos/:categoriaId" element={<Productos/>}/>
            <Route path="/Contactos" element={<Contactos/>}/>
          </Routes>
        </div>
      </div>
    </Router>
    </div>
  )
}

export default App
