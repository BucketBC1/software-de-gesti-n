import { useEffect, useState } from "react";
import './styles/Modal.css'


function CantidadProductoModal({isOpen, onClose, onConfirm, producto}) {

    if(!isOpen) return null;
    
        const [show, setShow] = useState(false);
        const [cantidad, setCantidad] = useState(1)
    
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
        <div className="modal-overlay">
            <div className={`modal-content ${show ? 'show' : ''}` }>
                <button className="close-button" onClick={handleClose}>x</button>

                <div className="divCantidad divContent">
                    <label>Cantidad:</label>
                    <input  
                        type="number"
                        min={1}
                        value={cantidad}
                        onChange={e => setCantidad(Number(e.target.value))}
                    />
                </div>

                <div className="divCantidadMaxima divContent">
                    <label>Cantidad maxima: {producto ? producto.stock : ''}</label>
                </div>
                <button 
                    className="submit"
                    onClick={() => {
                    onConfirm(cantidad);
                    handleClose();

                    }}
                >Confirmar</button>

            </div>

        </div>
    )
}

export default CantidadProductoModal