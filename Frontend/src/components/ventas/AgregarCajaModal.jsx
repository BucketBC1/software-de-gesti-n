import { useEffect, useState } from "react";
import './styles/Modal.css'
import { useAgregarCajas } from "./hooks/useAgregarCaja.jsx";

function AgregarCajaModal({ isOpen, onClose }) {

    if(!isOpen) return null;

    const {
        handleSubmit,
        nombre_caja,
        setNombre
    } = useAgregarCajas(onClose);

    const [show, setShow] = useState(false);

    useEffect(() => {
        if(isOpen){
            setTimeout(() => setShow(true), 10);
        } else {
            setShow(false);
        }
    }, [isOpen])

    const handleClose = () => {
        setShow(false);
        setTimeout(onClose, 300);
    };

    const handleFormSubmit = async (e) => {
        const success = await handleSubmit(e)
        if (success) {
            handleClose();
        }
    }


    return (
        <div className="modal-overlay">
            <div className={`modal-content ${show ? 'show' : ''}` }>

                <button className="close-button" onClick={handleClose}>x</button>
                <form className="formulario" onSubmit={handleFormSubmit}>

                    <div className="divNombreCaja divContent">
                        <label>Nombre caja:</label>
                        <input 
                            type="text"
                            value={nombre_caja}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Nombre de la caja..."
                        />
                    </div>

                    {/* <div className="divCheckbox divContent">
                        <label>Agregar contraseña:</label>
                        <input type="checkbox"/>
                    </div>

                    <div className="divPassword divContent">
                        <label>Contraseña:</label>
                        <input type="password"/>
                    </div>

                    <div className="divRePassword divContent">
                        <label>Repetir contraseña:</label>
                        <input type="password"/>
                    </div> */}

                    <button type="submit" className="submit" >Agregar caja</button>
                </form>
            </div>
        </div>
    );
}

export default AgregarCajaModal;
