import { useState, useEffect } from "react";

const MostrarCategorias = () => {
    const [categoria, setCatecoria] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/categorias')
            .then(res => res.json())
            .then(data => setCatecoria(data))
    })

    return (
        <>
            {categoria.map((cat) => (
                <li
                    key={cat.id}
                    className="categoria"
                    style={{ cursor: "pointer" }}
                >
                    <a></a>
                    <span className="nombreCategoria">{cat.nombre}</span>
                </li>
            ))}
        </>
    )
}

export default MostrarCategorias;