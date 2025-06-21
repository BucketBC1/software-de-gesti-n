import { useState, useEffect } from "react";


export const useAddProduct = (onClose) => {



    const [categorias, setCategorias] = useState([]);
    const [id_categorias, setIdCategoria] = useState("");


    const [codigo, setCodigo] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio_unitario, setPrecio] = useState("");
    const [stock, setCantidad] = useState("");
    /* const [imagen, setImagen] = useState(""); */

    useEffect(() => {
        fetch("http://localhost:5000/categorias")
        .then((response) => response.json())
        .then((data) => {
            console.log("datos recibidos", data);
            setCategorias(data);
        })
        .catch((error) => {
            console.error("Error al cargar categorías", error);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Validación básica
        if(!codigo || !nombre || !descripcion || !precio_unitario || !stock || !id_categorias) {
        alert("completa todos los campos")
        return
        }
        // Crear objeto producto
        const nuevoProducto = {
            codigo,
            nombre,
            descripcion,
            precio_unitario,
            stock,
            /* imagen, */
            id_categorias: parseInt(id_categorias)
        };

        try {
            const response = await fetch("http://localhost:5000/productos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevoProducto)
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Producto creado", data);
                alert("Producto creado correctamente");

                //Limpiar formulario
                setCodigo("");
                setNombre("");
                setDescripcion("");
                setPrecio("");
                setCantidad("");
                /* setImagen() */
                setIdCategoria("");

                handleClose()
            } else {
                const errorData = await response.json();
                console.error("Error al guaradar", errorData);
                alert("Error al guardar" + errorData.error);
            }

        } catch (error) {
            console.error("Error de red", error);
            alert("Error de red al guardar producto")
        }
    };

    return {
        handleSubmit,
        categorias,
        id_categorias,
        setIdCategoria,
        codigo,
        setCodigo,
        nombre,
        setNombre,
        descripcion,
        setDescripcion,
        precio_unitario,
        setPrecio,
        stock,
        setCantidad
    };

}