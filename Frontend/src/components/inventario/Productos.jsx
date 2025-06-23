import './styles/Inventario.css';
import { useState } from 'react';
import ShowProducts from './hooks/showProducts';
import ShowDescriptionProduct from './hooks/ShowDescriptionProduct'

const Productos = () => {

    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <div className="inventario">
            {/* <h1 className='title'>INVENTARIO</h1> */}
            <nav className="contenidoInventario">
                <a href="#Categorías">Categorías</a>
                <a href="#Mi tienda">Mi tienda</a>
                <a href="#Alertas">Alertas</a>
                <a href="#Historial">Historial</a>
            </nav>
            <div className="botonesInventario">

                <button
                    className="btn btn-secondary">
                    Agregar Producto
                </button>

            </div>

            <div className="content">
                {!selectedProduct ? (
                    <ShowProducts setSelectedProduct={setSelectedProduct}/>
                ) : (
                    <ShowDescriptionProduct product={selectedProduct}/>
                )}
            </div>
        </div>
    )
}

export default Productos
