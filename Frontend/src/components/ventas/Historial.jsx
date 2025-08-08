import { useEffect, useState } from "react";
import './styles/Historial.css';
import { useParams } from "react-router-dom";

function Historial() {

    const {idCaja} = useParams();
    const [orden, setOrden] = useState([]);
    const [detalleOrden, setDetalleOrden] = useState([]);
    const [caja, setCaja] = useState(null);
    
    useEffect(() => { 
        fetch(`http://localhost:5000/cajas/${idCaja}`)
            .then(res => res.json())
            .then(data => setCaja(data))
            .catch((error) => {
                console.error("Error al cargar las cajas", error)
            })
    }, [idCaja]);

    useEffect(() => { 
        fetch(`http://localhost:5000/ventas?idCaja=${idCaja}`)
            .then(res => res.json())
            .then(data => setOrden(data))
            .catch((error) => {
                console.error("Error al cargar las ordenes", error)
            })
    }, [idCaja]);

    useEffect(() => {
        fetch(`http://localhost:5000/detalles`)
        .then((res) => res.json())
        .then((data) => {
            setDetalleOrden(data);
        })
        .catch((error) => {
            console.error("Error al cargar las detalles", error)
        })
    }, [idCaja]);


    const ordenesCaja = orden.filter(o => o.id_caja === idCaja)

    return(
        <>
            <div className="content">
                <h2 className="title2">Historial</h2>
                <div className="ordenes">
                    <table className="orden">
                        <thead>
                            <tr>
                                <th>Numero de orden</th>
                                <th>Precio total</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        {ordenesCaja.map(ordenes => (
                        <tbody>
                            <tr key={ordenes.id}>
                                <td>{ordenes.numero_orden}</td>
                                <td>{ordenes.precio_total}</td>
                                <td>{ordenes.date}</td>
                            </tr>
                        </tbody>
                        ))}
                    </table>
                </div>
            </div>
        </>
    )
}

export default Historial;