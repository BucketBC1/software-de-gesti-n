import React, {useEffect, useState} from 'react';
import AddProductModal from './AddProductModal.jsx';
import AddCategorieModal from './AddCategorieModal.jsx';
import  ShowCategories from './hooks/ShowCategories.jsx';

import './styles/Inventario.css';

function Inventario() {
    const [isModalCategorieOpen, setIsModalCategorieOpen] = useState(false);
    const [isModalProductOpen, setIsModalProductOpen] = useState(false);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    const reloadData = async () => {
        const cats = await fetch('http://localhost:5000/categorias').then(r => r.json());
        const prods = await fetch('http://localhost:5000/productos').then(r => r.json());
        setCategories(cats);
        setProducts(prods);
    };

    useEffect(() => {
        reloadData();
    }, []);

    return(
        <div className="inventario">
            <nav className="contenidoInventario">
                <a href="#Categorías">Categorías</a>
                <a href="#Mi tienda">Mi tienda</a>
                <a href="#Alertas">Alertas</a>
                <a href="#Historial">Historial</a>
            </nav>
            <div className="botonesInventario">
                {/* <button 
                    onClick={() => setIsModalCategorieOpen(true)}
                    className="btn btn-primary">
                        Agregar Categoría
                </button> */}
                <button
                    onClick={() => setIsModalProductOpen(true)}
                    className="btn btn-secondary">
                    Agregar Producto
                </button>

                {/* <select>
                    <option disabled>Agregar filtro</option>
                    <option value="">Etapa</option>
                </select> */}
                
            </div>
            {/* <AddCategorieModal 
                isOpenCategorie={isModalCategorieOpen} 
                onCloseCategorie={() => {
                    setIsModalCategorieOpen(false);
                    reloadData();
                }}
            /> */}
            <AddProductModal
                isOpenProduct={isModalProductOpen} 
                onCloseProduct={() => {
                    setIsModalProductOpen(false)
                    reloadData();
                }}
            />

            <div className="content">
                <h2 className='title2'>Inventario</h2>
                <ul className="categoriasList">
                    <ShowCategories categories={categories} products ={products}/> 
                </ul>
            </div>
        </div>
    )
}

export default Inventario;
