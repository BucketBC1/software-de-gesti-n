import { useAuth } from '../../../context/AuthContext.jsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UseRegistroPersona = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [tipo_usuario, setTipo_usuario] = useState('Persona natural');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [tipo_documento, setTipo_documento] = useState('');
    const [documento, setDocumento] = useState('');
    const [fecha_nacimiento, setFecha_nacimiento] = useState('');


    const resetForm = () => {
        setTipo_usuario('');
        setCorreo('');
        setPassword('');
        setNombres('');
        setApellidos('');
        setTipo_documento('');
        setDocumento('');
        setFecha_nacimiento('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const usuarioData = { 
            tipo_usuario: tipo_usuario, 
            correo: correo, 
            password: password 
        };

        const personaData = {
            nombres: nombres,
            apellidos: apellidos,
            tipo_documento: tipo_documento,
            documento: documento,
            fecha_nacimiento: fecha_nacimiento
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

            const resPersonas = await fetch("http://localhost:5000/personas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...personaData, id_usuario: usuarioResult.id })
            });

            if (!resPersonas.ok) {
                const errorData = await resPersonas.json();
                console.error("Error al registrar persona", errorData);
                alert("Error al registrar persona: " + errorData.message);
                return false;
            }

            await resPersonas.json();
            alert("Registro exitoso");
            const token = usuarioResult.token;
            login(token);
            navigate("/inicio");
            resetForm();
            return true;
            
        } catch (error) {
            console.error("Error de red", error);
            alert("Error de red al guardar producto")
            return false;
        }
    };

    return {
        tipo_usuario,
        setTipo_usuario,
        correo,
        setCorreo,
        password,
        setPassword,
        nombres,
        setNombres,
        apellidos,
        setApellidos,
        tipo_documento,
        setTipo_documento,
        documento,
        setDocumento,
        fecha_nacimiento,
        setFecha_nacimiento,
        handleSubmit
    };
}

