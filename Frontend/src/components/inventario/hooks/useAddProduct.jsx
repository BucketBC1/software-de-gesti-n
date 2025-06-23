import { useState, useEffect } from "react";


export const useAddProduct = () => {



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
            
            setCategorias(data);
        })
        .catch((error) => {
            console.error("Error al cargar categorías", error);
        });
    }, []);

    const resetForm = () => {
        setCodigo("");
        setNombre("");
        setDescripcion("");
        setPrecio("");
        setCantidad("");
        setIdCategoria("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Validación básica
        if(!codigo || !nombre || !descripcion || !precio_unitario || !stock || !id_categorias) {
            alert("Complete todos los campos");
            return false;
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
                alert("Producto creado correctamente");

                //Limpiar formulario
                resetForm();
                return true;
            } else {
                const errorData = await response.json();
                console.error("Error al guaradar", errorData);
                alert("Error al guardar" + errorData.error);
            }

        } catch (error) {
            console.error("Error de red", error);
            alert("Error de red al guardar producto")
            return false;
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