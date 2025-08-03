import { useState, useEffect } from "react";


export const useAddProduct = (file) => {

    const [categorias, setCategorias] = useState([]);
    const [id_categorias, setIdCategoria] = useState("");

    const [subcategorias, setSubcategorias] = useState([]);
    const [id_subcategoria, setIdSubcategoria] = useState("");

    const [codigo, setCodigo] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio_unitario, setPrecio] = useState("");
    const [stock, setCantidad] = useState("");

    

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


    useEffect(() => {
        fetch("http://localhost:5000/subcategorias")
        .then((response) => response.json())
        .then((data) => {
            setSubcategorias(data);
        })
        .catch((error) => {
            console.error("Error al cargar subcategorías", error);
        });
    }, []);


    const resetForm = () => {
        setCodigo("");
        setNombre("");
        setDescripcion("");
        setPrecio("");
        setCantidad("");
        setIdCategoria("");
        setIdSubcategoria("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!codigo || !nombre || !descripcion  || !stock || !id_categorias || !id_subcategoria) {
            alert("Complete todos los campos");
            return false;
        }

        const formData = new FormData()
        formData.append("codigo", codigo);
        formData.append("nombre", nombre);
        formData.append("descripcion", descripcion);
        formData.append("precio_unitario", precio_unitario);
        formData.append("stock", stock);
        formData.append("id_categorias", id_categorias);
        formData.append("id_subcategoria", id_subcategoria);

        if(file) {
            formData.append("imagen", file);
        }
    

        try {
            const response = await fetch("http://localhost:5000/productos", {
                method: "POST",
                body: formData
            });

            if (response.ok) {
                await response.json();
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
        setIdCategoria,
        id_categorias,
        subcategorias,
        id_subcategoria,
        setIdSubcategoria,
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