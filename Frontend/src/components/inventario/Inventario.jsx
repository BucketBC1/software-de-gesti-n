import React, {useState} from 'react';
import AddProductModal from './AddProductModal.jsx';
import './styles/Inventario.css';

function Inventario() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return(
        <div className="inventario">
            {/* <h1 className='title'>INVENTARIO</h1> */}
            <nav className="contenidoInventario">
                <a href="#Categorías">Categorías</a>
                <a href="#Mi tienda">Mi tienda</a>
                <a href="#Alertas">Alertas</a>
                <a href="#Historial">Historial</a>
            </nav>
            <div className="botonesInventario">
                <button className="btn btn-primary">Agregar Categoría</button>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn btn-secondary">
                    Agregar Producto
                </button>
                <button className="btn btn-danger">Eliminar Categoría</button>
            </div>
            <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>

            <div className="categoriasInventario">
                <h2 className='title2'>Categorías</h2>
                <ul className='categoriasList'>
                    <li className='categoria'>
                        <a href=""></a>
                        <span className='nombreCategoria'>HERRAMIENTAS</span>
                    </li>
                    
                </ul>

                {/* <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Categoria</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Producto 1</td>
                            <td>Categoría A</td>
                            <td>$10.00</td>
                            <td>100</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Producto 2</td>
                            <td>Categoría B</td>
                            <td>$20.00</td>
                            <td>50</td>
                        </tr>
                    </tbody>
                </table> */}
            </div>
        </div>
    )
}

export default Inventario;
