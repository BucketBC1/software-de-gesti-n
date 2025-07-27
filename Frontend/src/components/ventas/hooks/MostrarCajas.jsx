import { useNavigate } from "react-router-dom";
import './styles/MostrarCajas.css';

function MostrarCajas({cajas}) {

    const navigate = useNavigate();


    return(
        <>
            {cajas.map((registradora) => (
                <li
                key={registradora.id}
                    className="caja"
                    style={{cursor: "pointer"}}
                    onClick={() => navigate(`/ventas/Ordenes`)}
                >
                    <a href=""></a>
                    <span className="nombreCaja">{registradora.nombre_caja}</span>
                </li>
            ))}

        </>
    )
}

export default MostrarCajas;