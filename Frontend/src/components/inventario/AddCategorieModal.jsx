import { useEffect, useState } from "react";
import './styles/AddProductModal.css';
import { useAddCategories } from "./hooks/useAddCategories";


const AddCategorieModal = ({isOpenCategorie, onCloseCategorie}) => {

    if (!isOpenCategorie) return null; 

    const {
        handleSubmit,
        nombre,
        setNombre
    } = useAddCategories(onCloseCategorie);



    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isOpenCategorie) {
            setTimeout(() => setShow(true), 10);
        } else {
            setShow(false);
        }
    }, [isOpenCategorie]);

    const handleClose = () => {
        setShow(false);
        setTimeout(onCloseCategorie, 300);
    };

    const handleFormSubmit = async (e) => {
        const success = await handleSubmit(e)
        if (success) {
            handleClose();
        }

    }



    return (
    <div className="modal-overlay">
      <div className={`modal-content ${show ? 'show' : ''}`}>
        <button className="close-button" onClick={handleClose}>x</button>
        <form onSubmit={handleFormSubmit}>
            <div className='divNombre value2'>
                <label>Nombre categoría:</label>
                <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder='Nombre categoría...'
                />
          </div>
          <button type="submit" className='btnSub'>Agregar categoría</button>
        </form>
      </div>
    </div>

    );
};

export default AddCategorieModal;