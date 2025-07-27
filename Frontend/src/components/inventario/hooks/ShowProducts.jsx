import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import './styles/showProducts.css';

import DeleteProducts from "./DeleteProducts";


const ShowProducts = ({setSelectedProduct}) => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(null);
    const [subcategories, setSubcategories] = useState([]);
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

    useEffect(() => {
        fetch('http://localhost:5000/subcategorias')
        .then(res => res.json())
        .then(data => setSubcategories(data))
        .catch((error) => console.error("Error al cargar subcategorias", error));
    }, []);

    const productosPorSubcategoria = products.reduce((acc, producto) => {
        const subcatId = producto.id_subcategoria;
        if (!acc[subcatId]) acc[subcatId] = [];
        acc[subcatId].push(producto);
        return acc;
    }, {});

    const handleDeleteLocal = (id) => {
        setProducts(products.filter(producto => producto.id !== id));
    };

    return(
        <>
            <h3 className='title2'>
                {category ? category.nombre : "Cargando..."}
            </h3>
            {Object.entries(productosPorSubcategoria).map(([subcatId, productos]) => {
                const subcat = subcategories.find(s => String(s.id) === String(subcatId));
                const subcatNombre = subcat ? subcat.nombre : "Subcategoría no encontrada";
                return (
                    <div className="containerSubcategoria">
                        <div className="containerShowProducts" key={subcatId}>

                            <div className="divTitle">
                                <h4 className="title3">{subcatNombre}</h4>
                            </div>
                            
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
                                    {productos.map(producto => (
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
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default ShowProducts;