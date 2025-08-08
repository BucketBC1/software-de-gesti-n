import './styles/Inventario.css';
import './hooks/styles/showProducts.css';
import { useEffect, useState } from 'react';
import ShowProducts from './hooks/ShowProducts.jsx';
import ShowDescriptionProduct from './hooks/ShowDescriptionProduct';
import AddProductModal from './AddProductModal.jsx';


const Productos = () => {

    const [isModalProductOpen, setIsModalProductOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);


    const handleDeleteProduct = (id) => {
        setProducts(products.filter(producto => producto.id !== id));
        setSelectedProduct(null); // Opcional: cerrar la descripción al eliminar
    };



    return (
        <div className="inventario">
            {/* <nav className="contenidoInventario">
                <a href="#Categorías">Categorías</a>
                <a href="#Mi tienda">Mi tienda</a>
                <a href="#Alertas">Alertas</a>
                <a href="#Historial">Historial</a>
            </nav> */}
            <div className="botonesInventario">

                <button
                    onClick={() => setIsModalProductOpen(true)}
                    className="btn btn-secondary">
                    Agregar Producto
                </button>
                
                {/* <select>
                    <option value="">meh</option>
                </select> */}

            </div>
            <AddProductModal 
                isOpenProduct={isModalProductOpen} 
                onCloseProduct={() => {
                    setIsModalProductOpen(false)
                }}
            />

            <div className="content">
                {!selectedProduct ? (
                    <ShowProducts setSelectedProduct={setSelectedProduct}/>
                ) : (
                    <ShowDescriptionProduct 
                        product={selectedProduct}
                        onDeleteProduct={handleDeleteProduct}
                    />
                )}
            </div>
        </div>
    )
}

export default Productos
