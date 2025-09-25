import { useState } from "react";


export const UseRegistroEmpresa = () => {

    const [tipo_usuario, setTipo_usuario] = useState('Empresa');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [password, setPassword] = useState('');

    const [razon_social, setRazon_social] = useState('');
    const [nit, setNit] = useState('');
    const [tipo_sociedad, setTipo_sociedad] = useState('');
    const [representante_legal, setRepresentante_legal] = useState('');
    const [actividad_economica, setActividad_economica] = useState('');

    const resetForm = () => {
        setCorreo('');
        setDireccion('');
        setPassword('');
        setRazon_social('');
        setNit('');
        setTipo_sociedad('');
        setRepresentante_legal('');
        setActividad_economica('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const usuarioData = { 
            tipo_usuario: tipo_usuario, 
            correo: correo,
            direccion: direccion,
            password: password 
        };

        const empresaData = {
            razon_social: razon_social,
            nit: nit,
            tipo_sociedad: tipo_sociedad,
            representante_legal: representante_legal,
            actividad_economica: actividad_economica
        };

        try {
            const resUsuario = await fetch("http://localhost:5000/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(usuarioData)

            });

            const usuarioResult = await resUsuario.json();

            if (!resUsuario.ok) throw new Error(usuarioResult.message || "Error al registrar usuario");

            const resEmpresa = await fetch("http://localhost:5000/empresas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({...empresaData, id_usuario: usuarioResult.id })

            });

            if (resEmpresa.ok) {
                await resEmpresa.json();
                alert("Registro exitoso");
                resetForm();
                return true;
            } else {
                const errorData = await resEmpresa .json();
                console.error("Error al registrar persona", errorData);
                alert("Error al registrar persona: " + errorData.message);
            }

        } catch (error) {
            console.error("Error de red", error);
            alert("Error de red al guardar producto")
            return false;
        }
    };

    return {
        handleSubmit,
        tipo_usuario,
        setTipo_usuario,
        correo,
        setCorreo,
        direccion,
        setDireccion,
        password,
        setPassword,
        razon_social,
        setRazon_social,
        nit,
        setNit,
        tipo_sociedad,
        setTipo_sociedad,
        representante_legal,
        setRepresentante_legal,
        actividad_economica,
        setActividad_economica
    }
}