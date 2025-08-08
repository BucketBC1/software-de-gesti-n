import './styles/ShowDescriptionProduct.css';
import EditProduct from './EditProduct';
import { useState } from 'react';

import DeleteProducts from './DeleteProducts';

const SwowDescriptionProduct = ({product, onDeleteProduct}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(product);

    const handleEditClick = () => setIsEditing(true);

    const handleSave = (updatedProduct) => {
        setCurrentProduct(updatedProduct);
        setIsEditing(false);
    };

    const handleCancel = () => setIsEditing(false);

    const handleDeleteLocal = (id) => {
        if (onDeleteProduct) {
            onDeleteProduct(id);

        }
        product.filter(producto => producto.id !== id);

    }

    return(
        <>
            <div className="contentProduct">
                <div className='headerProduct'>
                    <div className='headerNameCode'>
                        <span><strong>Codigo:</strong>{currentProduct.codigo}</span>
                    </div>

                    <div className='headerIcons'>
                        <div className='icon' onClick={handleEditClick}>
                            <box-icon name='edit-alt' color='#505050'></box-icon>
                        </div>
                        
                        <div className='icon'>
                            <DeleteProducts id={currentProduct.id} onDelete={handleDeleteLocal}/>
                        </div>
                    </div>
                </div>
                <div className='bodyProduct'>
                    <div className='imageProduct'>
                        <img src={`http://localhost:5000${currentProduct.imagen}`} alt="Producto" />
                    </div>
                    <div className='descriptionProduct'>
                        {isEditing ? (
                            <EditProduct
                                product={currentProduct}
                                onSave={handleSave}
                                onCancel={handleCancel}
                            />
                        ): (
                            <>
                                <span className='name'><strong>{currentProduct.nombre}</strong></span>
                                <div className='description'>
                                    <p><strong>Descripción:</strong> {currentProduct.descripcion}</p>
                                </div>
                                {/* <div className='unidadMedida-row'>
                                    <span><strong>Unidades de medida:</strong></span>
                                </div> */}
                                <div className='price-stock-row'>
                                    <div className='price text'>
                                        <span><strong>Precio por unidad:</strong>  {currentProduct.precio_unitario}</span>
                                    </div>
                                    <div className='stock text'>
                                        <span><strong>Cantidad:</strong>  {currentProduct.stock}</span>
                                    </div>
                                </div>
                            </>
                        )}
                        
                    </div>
                </div>
            </div>
        </>
    )
}
export default SwowDescriptionProduct;