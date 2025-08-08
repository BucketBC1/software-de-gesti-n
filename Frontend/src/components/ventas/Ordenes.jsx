import './styles/Ventas.css';
import './styles/Ordenes.css';
import CantidadProductoModal from './CantidadProductoModal';
import ConfirmarOrdenModal from './ConfirmarOrdenModal';


import { useEffect, useState } from 'react';


function Ventas() {

    const [categorias, setCategorias] = useState([]);
    const [subcategorias, setSubcategorias] = useState([]);
    const [productos, setProductos] = useState([]);
    const [ventas, setVentas] = useState([]);
    const [numeroOrdenActual, setNumeroOrdenActual] = useState("0001");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [isOpen, setIsOpen] = useState(null);
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmarOrdenModalOpen, setConfirmarOrdenModalOpen] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/categorias')
            .then(res => res.json())
            .then(data => setCategorias(data));
        fetch('http://localhost:5000/subcategorias')
            .then(res => res.json())
            .then(data => setSubcategorias(data));
        fetch('http://localhost:5000/productos')
            .then(res => res.json())
            .then(data => setProductos(data));
        fetch('http://localhost:5000/ventas')
            .then(res => res.json())
            .then(data => {
                setVentas(data);

                if (data.length === 0) {
                    setNumeroOrdenActual("0001");
                } else {
                    const maxNum = Math.max(...data.map(v => parseInt(v.numero_orden, 10)));
                    const siguiente = (maxNum + 1).toString().padStart(4, "0");
                    setNumeroOrdenActual(siguiente);
                }
            });
    }, []);

    const categoriasConProductos = categorias.filter(cat =>
        productos.some(prod => prod.id_categorias === cat.id)
    );

    const subcatFiltradas = subcategorias.filter(
        sub => {
            if (String(sub.id_categoria) === String(categoriaSeleccionada) && 
                    productos.some(prod => prod.id_subcategoria === sub.id)){
            return sub;
        }}
    );

    const totalOrden = productosSeleccionados.reduce(
        (acc, producto) => acc + (producto.precio_unitario * producto.cantidad), 0
    );

    return(
        <>
            
            <CantidadProductoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                producto={productoSeleccionado}
                onConfirm={(cantidad) => {
                    if (productoSeleccionado) {
                        setProductosSeleccionados([
                            ...productosSeleccionados,
                            {...productoSeleccionado, cantidad}
                        ]);
                    }
                    setIsModalOpen(false);
                    setProductoSeleccionado(null);
                }}
            />

            <ConfirmarOrdenModal
                isOpen={confirmarOrdenModalOpen}
                onClose={() => setConfirmarOrdenModalOpen(false)}
                productos={productosSeleccionados}
                totalOrden={totalOrden}
                numeroOrden={numeroOrdenActual}
            />


            <div className='content'>
                <h2 className='title2'>Crear orden</h2>
                <div className='ordenContent'>

                    <div className='ordenProductos'>

                        <table className='productosSeleccionados'>
                            <thead className='cabeceraTabla'>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Nombre</th>
                                    <th>Cantidad</th>
                                    <th>Precio</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody className='cuerpoTabla'>
                                {productosSeleccionados.map(producto => (

                                    <tr className='tr' key={producto.id}>
                                        <td>{producto.codigo}</td>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.cantidad}</td>
                                        <td>${producto.precio_unitario * producto.cantidad}</td>
                                        <td>
                                            <box-icon
                                                name='trash' 
                                                color='#ff0000'
                                                style={{cursor: "pointer"}}
                                                onClick={() => setProductosSeleccionados(productosSeleccionados.filter(p => p.id !== producto.id))}
                                            ></box-icon>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                        <div className='totalOrden'>
                            <label>Precio total</label>
                            <label>${totalOrden}</label>
                        </div>
                        <button 
                            className='btnOrden'
                            onClick={() => setConfirmarOrdenModalOpen(true)}
                        >
                            Crear orden
                        </button>
                    </div>


                    <div className='seleccionarProductos'>

                        <select 
                            className='selectCategorias'
                            value={categoriaSeleccionada}
                            onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                        >
                            <option disabled value="">Seleccionar categoria</option>
                            {categoriasConProductos.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.nombre}
                                </option>
                            ))}
                        </select>

                        <div className='subcategoriasList'>
                            {subcatFiltradas.map(subcat => (
                                <div key={subcat.id}>
                                    <button className='btnCategorias'
                                        onClick={() => setIsOpen(subcat.id === isOpen ? null : subcat.id)}
                                    >
                                        {subcat.nombre}
                                    </button>
                                    {isOpen === subcat.id && (
                                        <div className='productos-subcat'>
                                           
                                            {productos
                                                .filter(p => String(p.id_subcategoria) === String(subcat.id))
                                                .map(producto => (

                                                    <button 
                                                        className='btnDescripcionProductos' key={producto.id}
                                                        onClick={() => {
                                                                setProductoSeleccionado(producto);
                                                                setIsModalOpen(true);
                                                            }}
                                                    >
                                                        <label htmlFor={`prod-${producto.id}`}>{producto.codigo}</label>
                                                        <label htmlFor={`prod-${producto.id}`}>{producto.nombre}</label>
                                                        <label htmlFor={`prod-${producto.id}`}>{producto.stock}</label>
                                                        <label htmlFor={`prod-${producto.id}`}>${producto.precio_unitario}</label>
                                                    </button>
                                                ))    
                                            }
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Ventas;