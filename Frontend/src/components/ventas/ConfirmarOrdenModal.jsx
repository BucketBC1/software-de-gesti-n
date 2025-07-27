import { useEffect, useState } from 'react';
import './styles/Modal.css'



function ConfirmarOrdenModal({isOpen, onClose}) {

    if(!isOpen) return null;

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

    return(

        <div className='modal-overlay'>
            <div className={`modal-content ${show ? 'show' : ''}`}>
                <button className='close-button' onClick={handleClose}>x</button>
                <h2>Confirmar orden</h2>
                <form className='formulario'>

                    <div className='divNumeroOrden'>

                        <label htmlFor="">Orden N° 00001</label>
                    </div>

                    <div className='divProductos'>

                        <label htmlFor="">Codigo</label>
                        <label htmlFor="">Nombre</label>
                        <label htmlFor="">Cantidad</label>
                        <label htmlFor="">Precio</label>
                    </div>

                    <div className='divDescuentoMetodoPago'>

                        <div className='descuento'>
                            
                            <label htmlFor="">Seleccionar descuento</label>
                            <select name="" id="">
                                <option disabled value="">Descuento</option>
                            </select>
                        </div>

                        <div className='metodoPago'>

                            <label htmlFor="">Metodo de pago:</label>
                            <select name="" id="">
                                <option disabled value="">Seleccionar metodo de pago</option>
                            </select>
                        </div>

                        <div className='div'>

                        </div>
                        <label htmlFor="" className='costoTotal'>total costo:</label>
                        <label htmlFor="" className='cambio'>cambio:</label>
                    </div>

                    <button type='submit' className='submit'>Confirmar</button>

                </form>

            </div>

        </div>
    )
}

export default ConfirmarOrdenModal;