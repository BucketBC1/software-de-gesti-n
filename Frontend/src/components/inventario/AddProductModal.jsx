import { useEffect, useState } from 'react';
import './styles/AddProductModal.css';
import {useAddProduct} from './hooks/useAddProduct.jsx'

const AddProductModal = ({ isOpenProduct, onCloseProduct }) => {


  if (!isOpenProduct) return null;

  const {
    handleSubmit,
    categorias,
    id_categorias,
    setIdCategoria,
    codigo,
    setCodigo,
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    precio_unitario,
    setPrecio,
    stock,
    setCantidad
  } = useAddProduct(onCloseProduct);

  const [show, setShow] = useState(false);  

  useEffect(() => {
    if (isOpenProduct) {
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [isOpenProduct]);


  const handleClose = () => {
    setShow(false);
    setTimeout(onCloseProduct, 300); // Debe coincidir con la duración de la animación CSS
  };

  const handleFormSubmit = async (e) => {
    const success = await handleSubmit(e)
    if (success) {
      handleClose();
    }
  }

  
  
  /* ====================== POST ====================== */


  return (
    <div className="modal-overlay">
      <div className={`modal-content ${show ? 'show' : ''}`}>
        <button className="close-button" onClick={handleClose}>x</button>
        <form onSubmit={handleFormSubmit}>

          <div className='content'>
            <div className='divCategoria value1'>
              <label>Categoría:</label>
              <select
                value={id_categorias}
                onChange={(e) => setIdCategoria(e.target.value)}
              >
                <option disabled>Categorías</option>
                {categorias.map((categoria) => (

                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>

                ))}
              </select>
            </div>

            <div className='divCodigo value1'>
              <label>Codigo:</label>
                <input 
                  type="text"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  placeholder='JB344H'
                />
            </div>
          </div>

          

          <div className='divNombre value2'>
            <label>Nombre del producto:</label>
            <input 
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder='Nombre del producto...'
            />
          </div>

          <div className='divDescripcion value2'>
            <label>Descripción:</label>
            <input 
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder='Agrega una descripción...'
            />
          </div>

          <div className='divPrecio value2'>
            <label>Precio unidad:</label>
            <input 
              type="text"
              value={precio_unitario}
              onChange={(e) => setPrecio(e.target.value)}
              placeholder='Precio unitario'
            />
          </div>

          <div className='divCantidad value2'>
            <label>Cantidad:</label>
            <input 
              type="number"
              value={stock}
              onChange={(e) => setCantidad(e.target.value)}
            />
          </div>

          <button type="submit" className='btnSub'>Agregar Producto</button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
