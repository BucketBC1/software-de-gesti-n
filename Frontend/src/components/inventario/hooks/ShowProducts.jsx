import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import './styles/showProducts.css';

import DeleteProducts from "./DeleteProducts";


const ShowProducts = ({setSelectedProduct}) => {

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const {categoriaId} =useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/categorias/${categoriaId}`)
        .then((response) => response.json())
        .then((data) => {
            setCategory(data);
        })
        .catch((error) => {
            console.error("Error al cargar categorias", error);
        });
    }, [categoriaId]);

    useEffect(() => {
        fetch(`http://localhost:5000/productos?categoriaId=${categoriaId}`)
        .then((response) => response.json())
        .then((data) => {
            setProducts(data);
        })
        .catch((error) => {
            console.error("Error al cargar productos", error);
        });
    },[categoriaId]);
    

    const handleDeleteLocal = (id) => {
        setProducts(products.filter(producto => producto.id !== id));
    };

    return(
        <>
            <h2 className='title2'>
                {category ? category.nombre : "Cargando..."}
            </h2>
            
            <table className="tabla">
                <thead className="cabezeraTabla">
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Precio unidad</th>
                        <th>Cantidad</th>
                        <th>Eliminar producto</th>
                    </tr>
                </thead>
                <tbody className="cuerpoTabla">
                    {products.map(producto => (
                        <tr 
                            key={producto.id}
                            onClick={() => setSelectedProduct(producto)}
                        >
                            <td>{producto.codigo}</td>
                            <td>{producto.nombre}</td>
                            <td>{producto.precio_unitario}</td>
                            <td>{producto.stock}</td>
                            <td>
                                <DeleteProducts id={producto.id} onDelete={handleDeleteLocal}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default ShowProducts;