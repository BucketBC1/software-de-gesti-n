import { useEffect, useState } from "react"


export const useAddCategories = () => {

    const [nombre, setNombre] =useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!nombre) { 
            return alert("Complete todos los campos")
        }

        const nuevaCategoria = {
            nombre
        };

        try {
            const response = await fetch("http://localhost:5000/categorias", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevaCategoria)
            });

            if (response.ok) {
                const data = await response.json();
                alert("Categoría creada correctamente");
                
                setNombre("");
                return true;
            } else {
                const errorData = await response.json();
                console.error("Error al guardar", errorData);
                alert("Error al guardar" + errorData.error)
            }
        } catch (error) {
            console.error("Error de red" , error);
            alert("Error de red al guardar la categoría")
            return false;
            
        }
    };

    return {
        handleSubmit,
        nombre,
        setNombre
    };
}