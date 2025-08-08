import { useEffect, useState } from 'react';
import './styles/AddProductModal.css';
import {useAddProduct} from './hooks/useAddProduct.jsx'

const AddProductModal = ({ isOpenProduct, onCloseProduct }) => {

  if (!isOpenProduct) return null;
  const [file, setFile] = useState(null);

  const {
    handleSubmit,
    categorias,
    id_categorias,
    setIdCategoria,
    subcategorias,
    id_subcategoria,
    setIdSubcategoria,
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
  } = useAddProduct(onCloseProduct, file);

  const [show, setShow] = useState(false); 
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (isOpenProduct) {
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [isOpenProduct]);

  useEffect(() => {
    setIdSubcategoria(""); // Limpia la subcategoría cuando cambia la categoría
  }, [id_categorias]);


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

          {/* ===categoria-codigo====  */}
          <div className='categoria-codigo'>
            <div className='divCategoria '>
              <label>Categoría:</label>
              <select
                value={id_categorias}
                onChange={(e) => setIdCategoria(e.target.value)}
              >
                <option disabled value="">Categorías</option>
                {categorias.map((categoria) => (

                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>

                ))}
              </select>
            </div>

            <div className='divCodigo '>
              <label>Codigo:</label>
                <input 
                  type="text"
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value)}
                  placeholder='JB344H'
                />
            </div>
          </div>
          {/* ===categoria-codigo====  */}

          {/* ===subcategoria====  */}
          <div className='divSubcategoria'>
            <label>Subcategoría:</label>
            <select
              value={id_subcategoria}
              onChange={(e) => setIdSubcategoria(e.target.value)}
              disabled={!id_categorias}
            >
              <option disabled value="">Subcategorías</option>
              {subcategorias
                .filter(subcat => subcat.id_categoria === id_categorias)
                .map((subcategoria) => (
                <option key={subcategoria.id} value={subcategoria.id}>
                  {subcategoria.nombre}
                </option>
              ))}
            </select>
          </div>
          {/* ===subcategoria====  */}


          {/* ===nombre==== */}
          <div className='divNombre'>
            <label>Nombre del producto:</label>
            <input 
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder='Nombre del producto...'
            />
          </div>
          {/* ===nombre==== */}


          {/* ===precio-cantidad==== */}
          <div className='precio-cantidad'>
            <div className='divPrecio'>
              <label>Precio unidad:</label>
              <input 
                type="text"
                value={precio_unitario}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder='Precio unitario'
              />
            </div>
            <div className='divCantidad'>
              <label>Cantidad:</label>
              <input 
                type="number"
                value={stock}
                onChange={(e) => setCantidad(e.target.value)}
              />
            </div>
          </div>
          {/* ===precio-cantidad==== */}


          {/* ====unidad de medida==== */}
          {/* <div className='divUnidadMedida'>
              <label>Agregar unidad de medida:</label>
              <select>
                <option disabled>Unidad de medida</option>
                    <option></option>
              </select>
          </div> */}
          {/* ====unidad de medida==== */}



          {/* =====descripcion===== */}
          <div className='divDescripcion'>
            <label>Descripción:</label>
            <textarea 
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder='Agrega una descripción...'
            />
          </div>
          {/* =====descripcion===== */}

          {/* =====imagen===== */}
          <div className='divImagen'>
            <label>Seleccionar imagen:</label>
            <div>
              <img src={preview || null}/>
              <input 
                type="file" 
                accept="image/*"
                name="imagen"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setFile(file);
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setPreview(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
          </div>


          {/* =====imagen===== */}



      
          

          <button type="submit" className='btnSub'>Agregar Producto</button>
        </form>
      </div>



    </div>
  );
};

export default AddProductModal;
