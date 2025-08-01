import { useState } from "react"


export const useAgregarCajas = () => {

    const [nombre_caja, setNombre] = useState("");

    const resetForm = () => {
        setNombre("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!nombre_caja){
            alert("Complete los campos");
            return false;
        }

        const nuevaCaja = {
            nombre_caja
        }

        try {
            const response = await fetch("http://localhost:5000/cajas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(nuevaCaja)
            });

            if (response.ok) {
                await response.json();
                alert("Producto creado correctamente");

                resetForm();
                return true;
            } else {
                const errorData = await response.json();
                console.error("Error al guardar", errorData);
                alert("Error al guardar" + errorData.error);
            }
        } catch (error) {
            console.error("Error de red", error);
            alert("Error de red al guardar producto")
            return false;
        }
    };

    return{
        handleSubmit,
        nombre_caja,
        setNombre
    };
} 