import { useEffect, useState } from 'react';
import { UseConfirmarOrden } from './hooks/UseConfirmarOrden.jsx';
import './styles/Modal.css'



function ConfirmarOrdenModal({isOpen, onClose, productos, totalOrden, numeroOrden}) {

    if(!isOpen) return null;

    const {
        handleSubmit


    } = UseConfirmarOrden(onClose);

    const [show, setShow] = useState(false);

    useEffect(() => {
        if(isOpen){
            setTimeout(() => setShow(true), 10);
        } else {
            setShow(false);
        }
    }, [isOpen]);

    const handleClose = () => {
        setShow(false);
        setTimeout(onClose, 300);
    };

    const handleFormSubmit = async (e) => {
        const success = await handleSubmit(e, productos, numeroOrden, totalOrden);
        if (success){
            handleClose();
        }
    }


    return(

        <div className='modal-overlay'>

            <div className={`modal-content ${show ? 'show' : ''}`}>

                <button className='close-button' onClick={handleClose}>x</button>

                <label className='tituloConfirmar'><strong>Confirmar orden</strong></label>

                
                <form className='formulario' onSubmit={handleFormSubmit} >
                    <div className='divNumeroOrden'>
                        <label htmlFor="">Orden N° {numeroOrden}</label>
                    </div>
                    {productos.map(seleccionados => (
                        <div className='divProductos' key={seleccionados.id}>
                            <label htmlFor="">{seleccionados.codigo}</label>
                            <label htmlFor="">{seleccionados.nombre}</label>
                            <label htmlFor="">{seleccionados.cantidad}</label>
                            <label htmlFor="">${seleccionados.precio_unitario * seleccionados.cantidad}</label>
                        </div>
                    ))}
                    
                    <div className='divDescuentoMetodoPago'>
                        {/* <div className='descuento'>
                            
                            <label htmlFor="">Seleccionar descuento</label>
                            <select name="" id="">
                                <option disabled value="">Descuento</option>
                            </select>
                        </div> */}
                        {/* <div className='metodoPago'>
                            <label htmlFor="">Metodo de pago:</label>
                            <select name="" id="">
                                <option disabled value="">Seleccionar metodo de pago</option>
                            </select>
                        </div> */}
                        
                    </div>
                    <label htmlFor="" className='costoTotal'>Total costo: ${totalOrden}</label>
                    <button type='submit' className='submit'>Confirmar</button>
                </form>
                
            </div>

        </div>
    )
}

export default ConfirmarOrdenModal;