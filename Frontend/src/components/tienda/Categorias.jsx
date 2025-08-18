import './styles/Categorias.css';
import MostrarCategorias from "./hooks/MostrarCategorias";

function Categorias() {
    return (
        <ul className="categoriasList">
            <MostrarCategorias/>
        </ul>
    )
}

export default Categorias;